<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <router-link to="/admin/products" class="navbar-brand col-sm-3 col-md-2 mr-0">
        後台管理
      </router-link>

      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" v-on:click.prevent="signout">系統登出</a>
          
        </li>
      </ul>
    </nav>
  </div>
</template>




<script>
// 登出功能
export default {
  name: "navbar",
  methods: {
    signout() {
      const vm = this;
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/signin");
        }
      });
    }
  }
};
</script>>