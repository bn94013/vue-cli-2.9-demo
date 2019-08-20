<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>後台管理</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
  
            <router-link class="nav-link" to="/admin/products">
            <i class="far fa-images"></i>
              圖片列表
            </router-link>

          </li>
        </ul>





        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>前台頁面</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link to="/index" class="nav-link">
            <i class="fab fa-qq"></i>
              <span data-feather="file-text"></span>
              點我前往
            </router-link>
          </li>
        </ul>





      </div>
    </nav>
  </div>
</template>