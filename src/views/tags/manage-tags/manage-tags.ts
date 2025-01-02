import { defineComponent, ref, onMounted,Ref } from "vue";
import ApiService from "@/core/services/ApiServices";
import Swal from 'sweetalert2'
import { useAppStore } from "@/store/app";
import EditCreateTagsModel from '@/components/models/tags/edit-create/edit-create.vue'

export default defineComponent({

    components: {
        EditCreateTagsModel
    },
    setup() {
        //Begin:Declare Variables
        const store = useAppStore()
        const searchText = ref('')
        const currentPage = ref(1)
        const tagsList = ref([])

        const headers = ref([
            { title: 'Name', align: 'start', sortable: true, key: 'name', },
            
            { title: 'Actions', align: 'end', key: 'actions', sortable: false },
        ])
        const selectedData = ref([])

        const drawerRight = ref(false)
        const selectedIds = ref('')

        //End:Declare Variables
        const getQueryString = () => {
            const queryString = "?page_number=" + currentPage.value + "&search=" + searchText.value+ "&take=" + store.per_page;
            return queryString;
        }
        const handlePageChange = () => {
            getUserDetails()
        }
        // Begin::get user type list
        const getUserDetails = () => {
            store.startLoader()
            ApiService.get('tag' + getQueryString()).then(({ data }) => {
                tagsList.value = data.data.data
                
                store.total_page = store.getPageCount(data.data.total_record,store.per_page);
                // store.total_page = store.getPageCount(data.data.total, data.data.per_page);
                // store.per_page = data.data.data.per_page
                store.stopLoader()
            })
                .catch(({ response }) => {
                    store.stopLoader()
                    console.log("Error=>" + response.data.errors)
                })
        }
        // End:get user type list

        // Begin:Delete all
        const deleteAll = () => {
            const payload = ({
                delete_ids: ""
            });
            payload.delete_ids = selectedData.value.join(',')

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to delete this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {

                    store.startLoader()
                    ApiService.post('tag/delete-all', payload).then(({ data }) => {
                        store.stopLoader()
                        getUserDetails()

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
            })
        }

        // Begin::Delete usertype data
        const deleteUserType = (id: string) => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to delete this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {

                    store.startLoader()
                    ApiService.delete('tag/' + id).then(({ data }) => {
                        store.stopLoader()
                        getUserDetails()
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
            })
        }
        // End::Delete usertype data

        // Begin::edit create dialog open and pass data to parent
        const editCreateUserType = (id: string) => {
            drawerRight.value = true
            selectedIds.value = id
        }
        // End::edit create dialog open and pass data to parent

        const onSubmitChange = (evt: boolean) => {
            drawerRight.value=false
            getUserDetails()
        }

        //Begin:onMounted
        onMounted(() => {
            getUserDetails()
        })
        //End:onMounted

        return {
            headers,
            selectedData,
            searchText,
            tagsList,
            currentPage,
            store,
            selectedIds,
            drawerRight,
            handlePageChange,
            deleteUserType,
            deleteAll,
            editCreateUserType,
            onSubmitChange,
        }
    }
})
