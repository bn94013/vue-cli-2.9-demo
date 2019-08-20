<template>
  <div class="backa">
    <div class="mt-2">
      <div class="p-3 bg-dark text-white text-center">
        <h5 class="font-weight-bold bg-dark text-danger ml-1 ls-1">其他功能區  <i class="fas fa-bell"></i></h5>
      </div>
      <router-link to="/login" class="nav-link pand0">
        <button type="button" class="btn btn-lg btn-success btn-block font-weight-bold ">前往後臺  <i class="far fa-paper-plane"></i></button>
      </router-link>
        <router-link to="" class="nav-link pand0">
      <button type="button" class="btn btn-lg btn-success btn-block font-weight-bold" disabled>敬請期待  <i class="fab fa-android"></i></button>
         </router-link>
      <router-link to="" class="nav-link pand0">
      <button type="button" class="btn btn-lg btn-success btn-block font-weight-bold" disabled>敬請期待  <i class="fab fa-android"></i></button>
         </router-link>
    </div>
  </div>
</template>

<style>
.pand0{
  padding: 0;
}
.ls-1{
  letter-spacing:1px;
}
</style>