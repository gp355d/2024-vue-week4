export default{
  mounted() {
    this.delProductModal = new bootstrap.Modal(this.$refs.deleteProduct,{
      keyboard: false,
      backdrop: 'static'
    });
  },
  props:['tempProduct'],
  template:`    <div id="delProductModal" ref="deleteProduct" class="modal fade" tabindex="-1"
  aria-labelledby="delProductModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="delProductModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close"></button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{tempProduct.title}}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal" @click="close">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="deleteProduct">
          確認刪除
        </button>
      </div>
    </div>
  </div>
  </div>`,
  methods: {
    deleteProduct(){
      this.$emit('deleteData');
    },
    open(){
      this.delProductModal.show()
    },
    close(){
      this.delProductModal.hide()
      this.$emit('getProducts')
    }
  },
}