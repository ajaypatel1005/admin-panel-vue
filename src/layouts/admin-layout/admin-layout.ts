import { defineComponent,ref } from "vue";

import sidemenu from "@/layouts/sidemenu/sidemenu.vue"
import { useRoute } from 'vue-router'
import { useAppStore } from '../../store/app';
export default defineComponent({

    components:{
        sidemenu
    },
    setup(props,{emit})
    {
        const route = useRoute()
        const store=useAppStore()
        const themeName=ref('')

        const changeTheme=(evt:any)=>{
            emit('isThemeChange','true');
        }
        return{
            route,
            store,
            themeName,
            changeTheme
        }
    }

})