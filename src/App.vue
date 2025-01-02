<template>
  <v-app :theme="themeName">
   <v-main>
     <router-view v-on:isThemeChange="changeTheme($event)"/>
     <v-dialog v-model="store.isLoaderShow" max-width="70">
       <v-progress-circular
         :size="70"
         indeterminate
         class="primary--text"
       />
     </v-dialog>
   </v-main>
 </v-app>
</template>

<script setup>
 //
 import { ref,onMounted } from "vue";
 import { useAppStore } from './store/app';
 const store=useAppStore()
 const themeName=ref('')

 const changeTheme=(evt)=>{
   
       // alert(localStorage.getItem("darkMode"))
           if (localStorage.getItem("darkMode") == 'true') {
               themeName.value = 'dark'
           }
           else {
               themeName.value = 'light'
           }

        
 }

 onMounted(() => {
   if (localStorage.getItem("darkMode") == 'true') {
               themeName.value = 'dark'
           }
           else {
               themeName.value = 'light'
           }
         });

</script>
