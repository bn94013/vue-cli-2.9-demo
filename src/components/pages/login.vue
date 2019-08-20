<template>
  <div>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-bold text-center">圖檔管理登入</h1>
      <label for="inputEmail" class="sr-only">信箱帳號</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="請輸入Email"
        required
        autofocus
        v-model="user.username"
      />

      <div class="mt-3"></div>
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="請輸入Password"
        required
        v-model="user.password"
      />

    <div class="mt-4"></div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        登入<i class="far fa-paper-plane"></i>
      </button>
      <p class="mt-5 mb-3 text-center">&copy; wen小專題發表使用</p>
    </form>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      user: {
        username: "",
        password: "",  
      }
    };
  },
  methods: {
    signin() {
      const api = `${process.env.APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then(response => {
        console.log(response.data);
        if(response.data.success ){    //登入成功 回首頁
            vm.$router.push('/admin/products');
           alert("歡迎"+this.user.username+"登入");
        }else{
           alert("請輸入正確的郵箱 or 密碼");
        }
      });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
