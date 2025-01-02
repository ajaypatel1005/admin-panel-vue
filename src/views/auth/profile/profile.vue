<template>
  <v-form lazy-validation autocomplete="off" v-model="valid" ref="form">
    <v-row>
       
       <v-col cols="12" sm="4">
         <v-form ref="form" lazy-validation>
         <label>Name</label>
         <v-text-field
           v-model="profileData.name"
           :rules="rules.required"
           placeholder="Name"
           variant="outlined"
           hide-details="auto"
           color="primary"
           density="compact"
           class="mb-4"
         >
         </v-text-field>
      
         <label class="">Email ID</label>
         <v-text-field
         v-model="profileData.email"
         :rules="rules.email"
           placeholder="Email ID"
           variant="outlined"
           hide-details="auto"
           color="primary"
           density="compact"
           class="mb-4"
         >
         </v-text-field>
      

       </v-form>
       
       </v-col>
       
     </v-row>
     <div class="d-flex float-right mt-2">
  
         <v-btn variant="outlined" color="primary" prepend-icon="mdi-content-save" @click="submitUserData()"
         title="Submit"
           >Save</v-btn
         >
         <v-btn
         prepend-icon="mdi-arrow-left-drop-circle-outline"
           variant="outlined"
           class="ms-2"
           color="info"
           @click="$router.go(-1)"
           title="Back"
           >Back</v-btn
         >
      
     </div>
    </v-form>
</template>

<script src="./profile.ts"></script>