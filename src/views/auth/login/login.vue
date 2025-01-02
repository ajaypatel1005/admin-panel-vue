<template>
  <v-form lazy-validation autocomplete="off" v-model="valid" ref="form">
    <v-toolbar class="bg-primary">
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        v-model="loginData.email"
        color="primary"
        label="Username"
        variant="underlined"
        :rules="rules.email"
        autocomplete="off"
      ></v-text-field>

      <v-text-field
        v-model="loginData.password"
        label="Password"
        color="primary"
        variant="underlined"
        autocomplete="off"
        :rules="rules.required"
        :append-inner-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append-inner="passwordShow = !passwordShow"
      ></v-text-field>
    </v-card-text>
   
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" color="primary" outlined @click="onSubmit()" 
      title="Login"
        ><v-icon>mdi-lock</v-icon> Login
      </v-btn>
      <v-btn variant="outlined" color="error" outlined @click="reset()"
      title="Reset"
        ><v-icon>mdi-refresh</v-icon> &nbsp;Reset
      </v-btn>
      
      <v-spacer></v-spacer>

    </v-card-actions>

    <v-row class="mb-1 mt-1">
      <v-col cols="12" sm="12" class="text-center">
        <a href="#" class="text-body-2 font-weight-regular"><router-link to="forgot-password">Forgot Password ?</router-link></a> | 
        
      </v-col>
    
    </v-row>
    
  </v-form>
</template>
<script src="./login.ts"></script>