export default{
  props: ['tempProduct','isNew','url','path'],
  template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
    <div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="this.isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4" >
              <h3>主要圖片</h3>
              <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
              <img v-if="tempProduct.imageUrl" class="img-fluid" :src="tempProduct.imageUrl" alt="">
              <input type="file" class="form-control" @change="uploadFile" ref="files"/>
              <img v-if="tempProduct.imgPreviewURL" class="img-fluid" :src="tempProduct.imgPreviewURL">
              <button class="btn btn-primary text-white" type="button"@click.prevent="upload" :disabled="!this.file">確認上傳</button>
              <h3>新增多圖</h3>
              <div class="mb-2" v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="mb-3" v-for="(img,key) in tempProduct.imagesUrl" :key="key + 123">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input type="text" class="form-control"
                        placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                <img class="img-fluid" :src="img" alt="">
                
                
                </div>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages"  v-if="tempProduct.imagesUrl.length === 0 || tempProduct.imagesUrl[tempProduct.imagesUrl.length-1]">
                    新增圖片
                  </button>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                    刪除圖片
                  </button>
              </div>


            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control"
                          placeholder="請輸入分類" v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control"
                          placeholder="請輸入售價" v-model="tempProduct.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入產品描述" v-model="tempProduct.description">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入說明內容" v-model="tempProduct.content">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                          :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="close">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>`,
  data() {
    return {
      productModal: '',
      delProductModal: '',
      file: ''
    }
  },
  methods: {
    open(){
      this.productModal.show()
    },
    close(){
      this.productModal.hide()
      this.$emit('getProducts')
    },
    updateProduct(){
      this.$emit('updateData');
    },
    createImages(){
      this.$emit('createImg');
    },
    uploadFile(e) {
      const [file] = e.target.files
      this.file = file
      if(file){
        this.tempProduct.imgPreviewURL = window.URL.createObjectURL(file)
      }
      console.log(this.tempProduct,this.path,this.url);
    },
    upload(){
      const uploadedFile = this.$refs.files.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', uploadedFile)
        const apiurl = `${this.url}/api/${this.path}/admin/upload`;
        axios.post(apiurl,formData,{
          headers:{
            'Content-Type': 'multipart/form-data' 
          }
        })
        .then((res)=>{
          if(res.data.success){
            this.tempProduct.imageUrl = res.data.imageUrl
            this.tempProduct.imgPreviewURL = ''
          }
        })
        .catch((err)=>{
          console.log(err.data);
        })


    }
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal,{
      keyboard: false,
      backdrop: 'static'
    });
  }

}