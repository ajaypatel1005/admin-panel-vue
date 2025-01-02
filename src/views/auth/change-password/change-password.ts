import { defineComponent, ref, Ref,computed } from "vue";
import ApiService from "@/core/services/ApiServices";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import Swal from 'sweetalert2'
import *  as rules from '@/core/constatnts/validation'

interface Form {
    resetValidation: () => void;
  }

export default defineComponent({

    setup() {
        const valid = ref(null)
        const form : Ref<Form | null> = ref(null)
        const router = useRouter()
        const store = useAppStore()
        const pwdShowStatus = ref(false)
        const newPwdShowStatus = ref(false)
        const cmpPwdShowStatus = ref(false)
        const result = ref('')
        const changePasswordData = ref({
            current_password:null,
            new_password:null,
            confirm_password:null
        })
        const onSubmit =async () => {
            const { valid: isValid } = await (form.value as any).validate();
            if (isValid)
            {
            store.startLoader()
            ApiService.post('profile/change-password', changePasswordData.value).then(({ data }) => {
                // router.push({ name: "dashboard" });
                store.stopLoader()
                reset()
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
                    store.stopLoader()
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
        // reset form data
        const reset=()=>{
            changePasswordData.value={
                current_password:null,
                new_password:null,
                confirm_password:null
            }
            form.value?.resetValidation()
       }

       const passwordConfirmationRule = computed(() => {
        return () => (changePasswordData.value.new_password === changePasswordData.value.confirm_password) || 'Passwords do not match'
      });

        // const resetForm = () => {
        //     changePasswordData.current_password = '',
        //     changePasswordData.new_password = '',
        //     changePasswordData.confirm_password = ''
        // }
        return {
            valid,
            form,
            rules,
            passwordConfirmationRule,
            pwdShowStatus,
            newPwdShowStatus,
            cmpPwdShowStatus,
            result,
            changePasswordData,
            router,
            onSubmit,
            reset
        }
    }

})