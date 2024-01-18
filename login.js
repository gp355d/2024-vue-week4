import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js'
console.log(createApp);
createApp({
  data() {
    return {
      user:{
        email: '',
        password:''
      }
    }
  },
  methods: {
    checkLogin(){
      const users = {
        username: this.user.email,
        password: this.user.password
      }
      axios.post('https://ec-course-api.hexschool.io/v2/admin/signin',users)
      .then((res)=>{
        // console.log(res.data);
        const {token,expired} = res.data
        document.cookie = `hexToken=${token};expires=${new Date(expired)}};`;
        // console.log(token,expired);
        location = `product.html`
      })
      .catch((err)=>{
        alert(err.data.message)
        // console.log(err.data);
      })
      this.user.email = '';
      this.user.password = '';
    },
  },
}).mount('#app')