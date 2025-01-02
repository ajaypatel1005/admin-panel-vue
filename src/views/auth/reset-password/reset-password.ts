import { defineComponent, ref, reactive, onMounted,computed,Ref } from "vue";
import ApiService from "@/core/services/ApiServices";
import { useRouter,useRoute } from "vue-router";
import Swal from 'sweetalert2'
import { useAppStore } from "@/store/app";
import *  as rules from '@/core/constatnts/validation'

interface Form {
    resetValidation: () => void;
  }
  
export default defineComponent({

    setup()
    {
        //Begin:Declare Variables
        const valid = ref(null)
        const form : Ref<Form | null> = ref(null)

        const store = useAppStore()
        const router = useRouter()
        const route = useRoute()
        const passwordShow = ref(false)
        const cmpPwdShowStatus = ref(false)

        const isShowReset = ref(false)
        const responseMessage=ref('Verifying your link..')
        const resetData=reactive({
            email:'',
            new_password:'',
            confirm_password:'',
            reset_token:''
        })
        const resetTokenData=reactive({
            reset_token:'',
        })
       
        //End:Declare Variables

        const onSubmit =async () => {
            const { valid: isValid } = await (form.value as any).validate();
            if (isValid)
            {  
            store.startLoaderAuth()
            ApiService.post('forgot-passsword/reset-password',resetData).then(({data})=>{
                store.stopLoaderAuth()
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 5000,
                        icon: "success",
                        title: "Success!",
                        text: data.data.msg,
                    });
                    router.push({ name: "login" });
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
            resetData.new_password = '',
            resetData.confirm_password=''
            form.value?.resetValidation()
        }

          // Begin::get token data
          const getResetTokenVerifyLink = () => {

            resetTokenData.reset_token=`${route.params.reset_token}`

            store.startLoaderAuth()
            ApiService.post('forgot-passsword/token-verify',resetTokenData).then(({ data }) => {
                store.stopLoaderAuth()
                resetData.email = data.data.email
                resetData.reset_token=data.data.reset_token
                isShowReset.value=true
                
            })
                .catch(({ response }) => {
                    responseMessage.value=response.data.errors[0]
                    store.stopLoaderAuth()
                    isShowReset.value=false
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
        // End:get token data

        onMounted(()=>{
            getResetTokenVerifyLink()
        })

        const passwordConfirmationRule = computed(() => {
            return () => (resetData.new_password === resetData.confirm_password) || 'Passwords do not match'
          });

        return{
            valid,
            form,
            rules,
            passwordConfirmationRule,
            passwordShow,
            cmpPwdShowStatus,
            responseMessage,
            resetData,
            isShowReset,
            onSubmit,
            reset
        }
    }
})