import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js'
let productModal = '';
let delProductModal = '';
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
      isNew: false
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
    getProducts(){
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
      .then((res)=>{
        // console.log(res.data);
        this.products = res.data.products;
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
      }else{
        this.tempProduct = {...item};
        this.isNew = false;
      }
      productModal.show();
    },
    delProductModal(item){
      this.tempProduct = {...item};
      delProductModal.show();
    },
    deleteProduct(){
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
      .then((res)=>{
        console.log(res);
        this.getProducts();
        delProductModal.hide();
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
        this.getProducts();
        productModal.hide();
      })
    },
    close(){
      this.tempProduct={
        imagesUrl: []
      };
      productModal.hide();
      // this.getProducts();
    },
    createImages() {
      this.tempProduct.imagesUrl.push('');
    }
  },
  mounted() {
    const mytoken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
    axios.defaults.headers.common['Authorization'] = mytoken;
    this.checkUser();
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  },
})
app.mount('#app')