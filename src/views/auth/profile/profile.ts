import { defineComponent,ref,onMounted,Ref } from "vue";
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
        const valid = ref(null)
        const form : Ref<Form | null> = ref(null)

        const store=useAppStore();
        const profileData=ref({})

        // post user detail for update 
        const  submitUserData=async()=>{
            const { valid: isValid } = await (form.value as any).validate();
            if (isValid)
            {   
                    store.startLoader()
                    ApiService.post('profile/edit-profile',profileData.value).then(({data})=>{
                        store.stopLoader()
                        getUserDetails()
                        store.getAuthUser()
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
                        .catch(({response})=>{

                            store.stopLoader()
                            Swal.fire({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 5000,
                                icon: "error",
                                text: response.data.errors,
                            });
                                //console.log("Error=>"+response)
                        })
                    }
                }
// get user detail
        const  getUserDetails=()=>{
            store.startLoader()
            ApiService.get('load-menu').then(({data})=>{
                profileData.value=data.data.user
                store.stopLoader()
                })
                .catch(({response})=>{
                    store.stopLoader()
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 5000,
                        icon: "error",
                        text: response.data.errors,
                    });
                        //console.log("Error=>"+response)
                })
        }

        onMounted(()=>{
            getUserDetails()
       })

        return{
            valid,
            form,
            rules,
            store,
            profileData,
            submitUserData
        }
    }
})
