import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js'
import productModalCom from './productModal.js';
import deleteProductModalCom from './deleteProductModal.js';
import pageCom from './pagecom.js'
const app = createApp({
  data(){
    return {
      tempProduct: {
        imagesUrl:[]
      },
      products: [],
      checkUserStatus: '',
      apiUrl: 'https://ec-course-api.hexschool.io/v2',
      apiPath: "leo535",
      isNew: false,
      page: {}
    }
  },
  methods: {
    checkUser(){
      axios.post(`${this.apiUrl}/api/user/check`)
      .then((res)=>{
        // console.log(res);
        this.checkUserStatus = res.data.success;
        this.getProducts();

      })
      .catch((err)=>{
        // console.log(err);
        this.checkUserStatus = err.data.success;
        alert(err.data.message);
        location = 'login.html';
      })
    },
    getProducts(page=1){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`)
      .then((res)=>{
        // console.log(res.data);
        this.products = res.data.products;
        this.page = res.data.pagination
      })
      .catch((err)=>{
        console.log(err.data);
      })
    },
    openModal(status,item){
      if(status === 'new'){
        this.tempProduct = {
          imagesUrl:[]
        },
        this.isNew = true;
        console.log(this.$refs);
      }else{
        this.tempProduct = {...item};
        if(!Array.isArray(this.tempProduct.imagesUrl)){
          this.tempProduct.imagesUrl =[]
        }
        this.isNew = false;
      }
      this.$refs.userProductModal.open()
      
    },
    delProductModal(item){
      this.tempProduct = {...item};
      // delProductModal.show();
      this.$refs.userDeleteModal.open();
    },
    deleteProduct(){
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
      .then((res)=>{
        console.log(res);
        this.$refs.userDeleteModal.close();
      })
    },
    updateProduct(){
      let url ='';
      let method = 'post';
      if(this.isNew){
        url= `${this.apiUrl}/api/${this.apiPath}/admin/product`
      }else{
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        method = 'put';
      }
      let newData = {
        data: this.tempProduct
      }
      axios[method](url,newData)
      .then((res)=>{
        console.log(res.data);
        // this.getProducts();
        // productModal.hide();
        this.$refs.userProductModal.close()

      })
    },
    // close(){
    //   this.tempProduct={
    //     imagesUrl: []
    //   };
    //   this.$refs.deleteModal.close();
    //   this.getProducts();
    // },
    createImages() {
      this.tempProduct.imagesUrl.push('');
    }
  },
  mounted() {
    const mytoken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
    axios.defaults.headers.common['Authorization'] = mytoken;
    this.checkUser();
    // this.$refs.userdeleteModal.open();
    
  },
})
app.component('productModalCom',productModalCom)
app.component('deleteProductModalCom',deleteProductModalCom)
app.component('pageCom',pageCom)

app.mount('#app')