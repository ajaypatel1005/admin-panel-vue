import { defineComponent, ref, reactive,Ref } from "vue";
import ApiService from "@/core/services/ApiServices";
import { useAppStore } from "@/store/app";
import Swal from 'sweetalert2'
import *  as rules from '@/core/constatnts/validation'

interface Form {
    resetValidation: () => void;
  }

export default defineComponent({

    setup()
    {
        const store = useAppStore()
        const valid = ref(null)
        const form : Ref<Form | null> = ref(null)

        const sendBtnText=ref('Send forgot link')
        const isSuccessAlert=ref(false)
        const forgotData=reactive({
            email_id:''
        })

        const onSubmit =async () => {   
            const { valid: isValid } = await (form.value as any).validate();
            if (isValid)
            { 
            store.startLoaderAuth()
            ApiService.post('forgot-passsword/mail-send',forgotData).then(({data})=>{
                isSuccessAlert.value=true
                store.stopLoaderAuth()
                sendBtnText.value="Re-send Mail"
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 5000,
                        icon: "success",
                        title: "Success!",
                        text: data.data.msg,
                    });
                })
                .catch(({ response }) => {
                    store.stopLoaderAuth()
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 5000,
                        icon: "error",
                        text: response.data.errors,
                    });
                })
            }
        }

        
        const reset = () => {
            forgotData.email_id= ''
            form.value?.resetValidation()
        }

        return{
            valid,
            form,
            rules,
            forgotData,
            onSubmit,
            reset,
            isSuccessAlert,
            sendBtnText
        }
    }
})