import { defineComponent, ref, onMounted, Ref } from "vue";
import ApiService from "@/core/services/ApiServices";
import Swal from 'sweetalert2'
import { useAppStore } from "@/store/app";
import { useRoute } from 'vue-router'
import *  as rules from '@/core/constatnts/validation'

interface Form {
    resetValidation: () => void;
}

interface UserTypesData {
    id: number;
    name: string,
}

export default defineComponent({
    props: {
        selectedIds: {
            type: [String, Number],
            required: true
        }
    },
    setup(props, { emit }) {

        const valid = ref(null)
        const form: Ref<Form | null> = ref(null);

        const store = useAppStore();
        const userTypesData: Ref<UserTypesData> = ref({
            id: 0,
            name: '',
            
        })
        
        const isLoaderShow = ref(false)

        // submit user type data
        const onSubmit = async () => {
            const { valid: isValid } = await (form.value as any).validate();
            if (isValid) {
                isLoaderShow.value = true

                if (props.selectedIds !== '') {
                    ApiService.put('tag/' + userTypesData.value.id, userTypesData.value).then(({ data }) => {
                        isLoaderShow.value = false
                        emit('isSubmit', true);
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
                            isLoaderShow.value = false
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
                else {
                    ApiService.post('tag', userTypesData.value).then(({ data }) => {
                        isLoaderShow.value = false
                        //reset()
                        emit('isSubmit', true);
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
                            isLoaderShow.value = false
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
        }
        // reset form data
        const reset = () => {
            userTypesData.value = {
                id: 0,
                name: '',
            }
            form.value?.resetValidation()
        }
        // get user type edit specified data
        const getUserTypeDetail = () => {
            isLoaderShow.value = true
            ApiService.get('tag/' + props.selectedIds).then(({ data }) => {
                userTypesData.value = data.data

                isLoaderShow.value = false
            })
                .catch(({ response }) => {
                    isLoaderShow.value = false
                    console.log("Error=>" + response.data.errors)
                })
        }

        // on mounted properties
        onMounted(() => {
            if (props.selectedIds !== '') {
                getUserTypeDetail()
            }
        })
        return {
            valid,
            form,
            rules,
            store,
            isLoaderShow,
            onSubmit,
            reset,
            userTypesData,
           
        }
    }
})