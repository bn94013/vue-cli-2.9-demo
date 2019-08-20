<template>
  <div>
    <!-- 讀取效果 -->
    <loading :active.sync="isLoading"></loading>

    <!-- 建檔按鈕 -->
    <div class="text-left mt-5">
      <button class="btn btn-primary" v-on:click="openModel(true)">點選建檔</button>
    </div>
    <!-- 建檔按鈕 End-->

    <!-- 圖片檔案操作頁面 -->
    <table class="table table-sm mt-4 table-hover">
      <thead class="thead-dark">
        <tr>
          <th>縮圖</th>
          <th>圖片名稱</th>
          <th>編輯圖片</th>
          <th>刪除圖片</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>
            <div
              style="width:45px; height: 45px; background-size: cover; background-position: center"
              class="rounded-circle"
              :style="{backgroundImage: `url(${item.imageUrl})`}"
            ></div>
          </td>
          <td>{{item.title}}</td>
          <td>
            <button class="btn btn-outline-primary" v-on:click="openModel(false, item)">編輯</button>
          </td>
          <td>
            <button
              class="btn btn-outline-danger"
              @click="delModal(item)"
              data-toggle="modal"
              data-target="#delalert"
            >刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 圖片檔案操作頁面 end -->

    <!-- 頁面切換組件  -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
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

    <!-- 圖檔上傳 -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h4 class="modal-title" id="exampleModalLabel">
              <span class>圖檔管理</span>
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span class="text-danger" aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="customFile">上傳圖片或拖曳圖片</label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    v-on:change="uploadFile"
                  />
                </div>

                <div class="form-group">
                  <label for="image">圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結"
                  />
                </div>

                <label>圖片上傳檢視</label>
                <i class="fas fa-spinner fa-pulse" v-if="status.fileUploading"></i>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">圖片名稱</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="請輸入圖片名稱"
                  />
                </div>

                <div class="form-group">
                  <label for="description">圖片敘述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入圖片描述"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="updateProduct">確認</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 圖檔上傳end -->

    <!-- 刪除圖片-->
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content border-2">
          <div class="modal-footer mb-lf">
            <button type="button" class="btn btn-danger" @click="delProuduct()">刪除</button>

            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 刪除圖片end-->
  </div>
</template>

<style>
.mb-lf {
  justify-content: space-around;
}
</style>


<script>
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      alert_delete: false,
      delete_id: "",
      isLoading: false,
      status: {
        fileUploading: false
      }
    };
  },

  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      // console.log(process.env.APIPATH ,process.env.CUSTOMPATH);
      // console.log(api);
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModel(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      $("#productModal").modal("show");
    },

    updateProduct(isNew, item) {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = "post";
      console.log(api);
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        console.log(response.data);
        if (response.data.success) {
          $("#productModal").modal("hide");
          vm.getProducts();
        } else {
          $("#productModal").modal("hide");
          vm.getProducts();
          console.log("新增失敗了");
        }
        // vm.products = response.data.products;
      });
    },

    delModal(item) {
      const vm = this;
      vm.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    delProuduct() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      this.$http.delete(api, { data: vm.tempProduct }).then(response => {
        //注意資料送出格式
        console.log(response.data);
        if (response.data.success) {
          $("#delProductModal").modal("hide");
          vm.getProducts();
        } else {
          alert("刪除失敗");
          $("#delProductModal").modal("hide");
        }
      });
    },

    uploadFile() {
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      this.$http
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          console.log(response.data);
          vm.status.fileUploading = false;
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            this.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>