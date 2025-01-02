import { defineComponent, ref, onMounted, Ref } from "vue";
import ApiService from "@/core/services/ApiServices";
import Swal from 'sweetalert2'
import { useAppStore } from "@/store/app";
import { useRoute } from 'vue-router'
import *  as rules from '@/core/constatnts/validation'

interface Form {
    resetValidation: () => void;
}

interface TagData {
    id: number;
    name: string,
}
interface TodoData {
    id: number;
    title: string,
    description: string,
    is_completed: number,
    tags: string[],
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

        const tagData: Ref<TagData> = ref({
            id: 0,
            name: '',
          
        })

        const todoData: Ref<TodoData> = ref({
            id: 0,
            title: '',
            description: '',
            is_completed: 0,
            tags: [],
        })

        const isLoaderShow = ref(false)

        // submit user type data
        const onSubmit = async () => {
            const { valid: isValid } = await (form.value as any).validate();
            if (isValid) {
                isLoaderShow.value = true

                if (props.selectedIds !== '') {
                    ApiService.put('to-do/' + todoData.value.id, todoData.value).then(({ data }) => {
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
                    ApiService.post('to-do', todoData.value).then(({ data }) => {
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
            todoData.value = {
                id: 0,
                title: '',
                description: '',
                is_completed: 0,
                tags: [],
            }
            form.value?.resetValidation()
        }
        // get todo edit specified data
        const getTodoDetail = () => {
            isLoaderShow.value = true
            ApiService.get('to-do/' + props.selectedIds).then(({ data }) => {
                todoData.value = data.data

                isLoaderShow.value = false
            })
                .catch(({ response }) => {
                    isLoaderShow.value = false
                    console.log("Error=>" + response.data.errors)
                })
        }

         // get tag edit specified data
         const getTagList = () => {
            isLoaderShow.value = true
            ApiService.get('all-tags').then(({ data }) => {
                tagData.value = data.data

                isLoaderShow.value = false
            })
                .catch(({ response }) => {
                    isLoaderShow.value = false
                    console.log("Error=>" + response.data.errors)
                })
        }

        // on mounted properties
        onMounted(() => {
            getTagList()
            if (props.selectedIds !== '') {
                getTodoDetail()
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
            tagData,
            todoData,
        }
    }
})