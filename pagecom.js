export default{
  props:['pageInfo'],
  template:`<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{'disabled':!pageInfo.has_pre }"><a class="page-link" href="#" @click="getProduct(pageInfo.current_page - 1)"><span aria-hidden="true">&laquo;</span></a></li>
    <li class="page-item" v-for="(page,i) in pageInfo.total_pages" :key="'page'+ i" :class="{'active':page === pageInfo.current_page,'disabled':page === pageInfo.current_page}"><a class="page-link" href="#" @click="getProduct(page)">{{page}}</a></li>
    <li class="page-item" :class="{'disabled':!pageInfo.has_next }"><a class="page-link" href="#"@click="getProduct(pageInfo.current_page + 1)"><span aria-hidden="true">&raquo;</span></a></li>
  </ul>
</nav>`,
methods: {
  getProduct(page){
    this.$emit('getProducts',page)
  }
},
}