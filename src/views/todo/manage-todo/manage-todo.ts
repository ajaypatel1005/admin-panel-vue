import { defineComponent, ref, onMounted } from "vue";
import ApiService from "@/core/services/ApiServices";
import Swal from 'sweetalert2'
import { useAppStore } from "@/store/app";
import EditCreateTodoModel from '@/components/models/todo/edit-create/edit-create.vue'

export default defineComponent({

    components: {
        EditCreateTodoModel
    },
    setup() {

        //Begin:Declare Variables
        const store = useAppStore()
        const searchText = ref('')
        const currentPage = ref(1)
        const todoList = ref([])
        const colorList = ref([
            'red', 'green', 'blue', 'orange', 'purple', 'pink', 'teal', 'indigo', 'yellow', 'brown', 'red', 'green', 'blue', 'orange',
        ]);

        const headers = ref([
            { title: 'Title', align: 'start', sortable: true, key: 'title', },
            { title: 'Description', align: 'start', sortable: true, key: 'description', },
            { title: 'Tags', align: 'start', sortable: true, key: 'tags', },
            { title: 'Status', align: 'start', sortable: true, key: 'is_completed', },
            { title: 'Create At', align: 'start', sortable: true, key: 'created_at_formate', },
            { title: 'Updated At', align: 'start', sortable: true, key: 'updated_at_formate', },
            { title: 'Actions', align: 'end', key: 'actions', sortable: false },
        ])
        const selectedData = ref([])

        const drawerRight = ref(false)
        const selectedIds = ref('')


        const pickColor = (index: number) => {
            return colorList.value[index];
        }

        //End:Declare Variables
        const getQueryString = () => {
            const queryString = "?page_number=" + currentPage.value + "&search=" + searchText.value + "&take=" + store.per_page;
            return queryString;
        }
        const handlePageChange = () => {
            getListRecords()
        }

        // Begin::get list
        const getListRecords = () => {
            store.startLoader()
            ApiService.get('to-do' + getQueryString()).then(({ data }) => {
                todoList.value = data.data.data

                store.total_page = store.getPageCount(data.data.total_record, store.per_page);
                
                store.stopLoader()
            })
                .catch(({ response }) => {
                    store.stopLoader()
                    console.log("Error=>" + response.data.errors)
                })
        }
        // End:get list

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
                    ApiService.post('to-do/delete-all', payload).then(({ data }) => {
                        store.stopLoader()
                        getListRecords()

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
                    ApiService.delete('to-do/' + id).then(({ data }) => {
                        store.stopLoader()
                        getListRecords()
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
            drawerRight.value = false
            getListRecords()
        }

        //Begin:onMounted
        onMounted(() => {
            getListRecords()
        })
        //End:onMounted

        return {
            headers,
            selectedData,
            searchText,
            todoList,
            currentPage,
            store,
            selectedIds,
            drawerRight,
            handlePageChange,
            deleteUserType,
            deleteAll,
            editCreateUserType,
            onSubmitChange,
            pickColor
        }
    }
})
