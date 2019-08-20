<template>
  <div>
    <!-- <loading :active.sync="isLoading"></loading> -->
    <div class="wrapper">

      <div class="main">
        <!-- 產品列表 -->
        <div class="row mt-4 justify-content-around">
          <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
            <div class="card border-dark shadow-sm bordwidth">
              <div
                style="height: 150px; background-size: cover; background-position: center"
                :style="{backgroundImage: `url(${item.imageUrl})`}"
              ></div>

              <div class="card-footer bg-dark">
                <h5 class="text-left text-light">圖片名稱 : {{ item.title }}</h5>

                <div class="text-center">
                  <button
                    type="button"
                    class="btn btn-outline-warning btn-xl"
                    @click="getProduct(item.id)"
                  >
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === product.id"></i>
                    查看更多
                    <i class="far fa-hand-point-up far-s5"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 mb-4 card border-dark bordwidth backjpg2">
            <div class="card-footer text-right">
              <indexbox></indexbox>
            </div>
          </div>
        </div>
        <!-- 產品列表 -->


        <!-- 單一產品頁面 -->
        <div
          class="modal fade"
          id="productModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >

          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  <!-- 關閉 -->
                </button>
              </div>
              <div class="modal-body">
                <img :src="product.imageUrl" class="img-fluid" alt />
                <blockquote class="blockquote mt-3">
                  <footer class="text-left">敘述內容:{{ product.description }}</footer>
                </blockquote>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>
        <!-- 單一產品頁面 end-->
      </div>


    <!-- 頁面切換排版 -->
      <div class="container">
        <div class="row">
          <div class="col-sm-3"></div>
          <div class="col-sm-6">
            <!-- 頁面切換組件  -->
            <nav aria-label="Page navigation example ">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled': !pagination.has_pre }">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    v-on:click.prevent="getProducts(pagination.current_page -1 )"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li
                  class="page-item"
                  v-for="page in pagination.total_pages"
                  :key="page"
                  :class="{'active':pagination.current_page === page}"
                >
                  <a class="page-link" href="#" v-on:click.prevent="getProducts(page)">{{page}}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pagination.has_next }">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    v-on:click.prevent="getProducts(pagination.current_page +1 )"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
            <!-- 頁面切換組件 end  -->
          </div>
          <div class="col-sm-3"></div>
        </div>
      </div>
    <!-- 頁面切換排版 end -->

    </div>



  </div>
</template>

<style>
.bordwidth {
  border-width: 5px;
}

.far-s5 {
  margin-left: 8px;
  font-size: 20px;
}

.backjpg2{
  width: 100%;
  background: url(images/bac02.jpg) no-repeat;
  background-size: cover;
}
</style>



<script>
import $ from "jquery";
import indexbox from "./indexbox";

export default {
  data() {
    return {
      products: [], //定義產品列表
      product: {}, //定義單一產品
      pagination: {},
      isLoading: false,
      status: {
        loadingItem: "" //目前預設讀取
      }
    };
  },
  components: {
    indexbox
  },
  methods: {
    getProducts(page = 1) {
      const vm = this; //先定義this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`; //路徑
      vm.isLoading = true; //未載入資料時狀態
      this.$http.get(url).then(response => {
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        vm.isLoading = false; //載入資料後狀態
      });
    },
    getProduct(id) {
      const vm = this; //先定義this
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`; //路徑product為單數
      vm.status.loadingItem = id; //未載入資料時狀態
      this.$http.get(url).then(response => {
        vm.product = response.data.product;
        $("#productModal").modal("show"); //顯示modal
        vm.status.loadingItem = ""; //載入資料後狀態
      });
    }
  },
  created() {
    this.getProducts(); //抓產品列表
  }
};
</script>