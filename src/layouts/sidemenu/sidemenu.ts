import { defineComponent,ref,reactive,onMounted } from "vue";
import { useAppStore } from "@/store/app";
import { useDisplay } from 'vuetify'
export default defineComponent({

    setup(props,{emit})
    {
        const store=useAppStore()
        const { mobile } = useDisplay()

        const drawer=ref(true)
        const darkMode=ref(false)
        const profile_items = reactive([{text: "My Profile", icon: "mdi-account", links: "/profile"},
        {
          text: "Change Password",
          icon: "mdi-lock",
          links: "/change-password",
        },])
        

        const toggleDarkMode= ()=> {
            darkMode.value = !darkMode.value;
            localStorage.setItem("darkMode", darkMode.value.toString());
            emit('isThemeChange','true');
          }

        onMounted(()=>{
            
            if(localStorage.getItem("darkMode")=='true')
            {
                darkMode.value=true
            }
            else
            {
                darkMode.value=false
            }

            if(mobile.value==true)
            {
                drawer.value=false
            }
            store.getAuthUser();
            
       })

        return{
            store,
            drawer,
            profile_items,
            toggleDarkMode,
            darkMode
        }
    }
})