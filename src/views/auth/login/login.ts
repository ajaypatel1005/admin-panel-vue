import { defineComponent, ref, reactive,Ref } from "vue";
import ApiService from "@/core/services/ApiServices";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import Swal from 'sweetalert2'
import *  as rules from '@/core/constatnts/validation'

interface Form {
    resetValidation: () => void;
    // Other properties and methods...
  }
  
export default defineComponent({

    setup() {
        const valid = ref(null)
        const form: Ref<Form | null> = ref(null);
        const passwordShow = ref(false)
        const router = useRouter()
        const store = useAppStore()
        const loginData = reactive({
            email: '',
            password: ''
        })

        const onSubmit =async () => {

            const { valid: isValid } = await (form.value as any).validate();
            if (isValid)
            {   
                store.startLoaderAuth()
                ApiService.post('login',loginData).then(({data})=>{
                localStorage.setItem(import.meta.env.VITE_APP_TOKEN_NAME, data.data.token)
                ApiService.setHeader();

                router.push({ name: "dashboard" });
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
            loginData.email = '',
            loginData.password = ''
            form.value?.resetValidation()
        }
        // onMounted(() => {
        //   });

        return {
            valid,
            form,
            rules,
            loginData,
            passwordShow,
            onSubmit,
            reset,
          
        }
    },
})