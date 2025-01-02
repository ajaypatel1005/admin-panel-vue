// Utilities
import { defineStore } from 'pinia'
import ApiService from '@/core/services/ApiServices'
import Swal from 'sweetalert2'
import store from '.'


// Define interfaces for your data structures
export interface MenuItem {
  slug: string;
  name: string;
  child: MenuItem[]; // Array of MenuItem (to support nested menus)
  permissions: Permission[]; // Array of Permission (assuming you have a Permission interface)
}

export interface Permission {
  name: string;
  // Add other properties as needed
}

export interface UserDetail {
  id: number;
  name: string;
}

export interface DashboardData {
  total_tag: number;
  total_todo_complated: number;
  total_todo_pending: number;
  total_todo: number;
  total_tag_percentage: number;
  total_complated_percentage: number;
  total_pending_percentage: number;
  total_todo_percentage: number;
}

export const useAppStore = defineStore('app', {
  state() {
    return {
      menuList: [] as MenuItem[],
      userDetail: {} as UserDetail,
      dashboardData: {} as DashboardData,
      isLoaderShow: false,
      isLoaderShowList: false,
      isMobileDevice: false,
      isDarkTheme: false,
      total_page: 0,
      per_page: 10,
      currentPage: 1,
    }
  },
  actions: {
    getAuthUser() {
      ApiService.get('load-menu').then(({ data }) => {
        this.menuList = data.data.menu
        this.userDetail = data.data.user
        this.dashboardData = data.data.dashboard_data
        // console.log("menu"+data.data.menu[0].name)
      })
        .catch(({ response }) => {
          // console.log("Error=>"+response)
          localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_NAME);
          // localStorage.clear();
          window.location.href = '/';
        })
    },
    logout() {
      localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_NAME);
      // localStorage.clear();
      window.location.href = '/';
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        icon: "success",
        title: "Success!",
        text: "Logout Successfully",
      });
    },
    startLoader() {
      this.isLoaderShowList = true
    },
    stopLoader() {
      this.isLoaderShowList = false
    },
    startLoaderAuth() {
      this.isLoaderShow = true
    },
    stopLoaderAuth() {
      this.isLoaderShow = false
    },
    getPageCount(dividend: any, devider: any) {
      const page = Math.floor(dividend / devider);
      if (dividend % devider == 0) return page;
      else return page + 1;
    },
   



  }
})
