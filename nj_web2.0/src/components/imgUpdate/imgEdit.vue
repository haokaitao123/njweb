<template>
  <div class="image-editor" >
    <Row :gutter="10">
      <Col span="14" class="image-editor-con1">
      <div class="cropper">
        <img id="cropimg1" ref="cropimg1" alt="">
      </div>
      </Col>
      <Col span="10" class="image-editor-con1">
      <Row type="flex" justify="center" align="middle" class="image-editor-con1-preview-con">
        <div id="preview1"></div>
      </Row>
      <form class="image-editor-con1-btn-con margin-top-10" id="imgform">
        <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" name="file" @change="handleChange1" id="fileinput1" class="fileinput" />
        <label class="filelabel" for="fileinput1"><Icon type="image"></Icon>&nbsp;选择图片</label>
        <!--<span><Button @click="ok" type="primary" icon="crop">裁剪</Button></span>-->
      </form>
<!--      <Modal v-model="option1.showCropedImage" @onOk="ok">
        <p slot="header">预览裁剪之后的图片</p>
        <img :src="option1.cropedImg" alt="" v-if="option1.showCropedImage" style="width: 100%;">
      </Modal>-->
      </Col>
    </Row>
  </div>
</template>
<script>
  import Cropper from 'cropperjs'
  import './cropper.min.css'
//  import { uploadimage } from '../../axios/axios'

  export default {
    name: 'image-editor',
    data() {
      return {
        cropper1: {},
        option1: {
          showCropedImage: false,
          cropedImg: '',
        },
      }
    },
    methods: {
      handleChange1(e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
          this.cropper1.replace(reader.result)
          reader.onload = null
        }
        reader.readAsDataURL(file)
      },
      handlecrop1() {
        const file = this.cropper1.getCroppedCanvas().toDataURL()
        this.option1.cropedImg = file
        this.option1.showCropedImage = true
      },
      ok() {
        this.$emit('ok', this)
      },
    },
    mounted() {
      const img1 = this.$refs.cropimg1
      this.cropper1 = new Cropper(img1, {
        dragMode: 'move',
        preview: '#preview1',
        zoomable: false,
        aspectRatio: 1,
        restore: false,
        center: false,
        highlight: false,
        cropBoxMovable: false,
        toggleDragModeOnDblclick: false,
      })
      this.ok()
    },
  }
</script>
<style lang="scss" scoped>
@import "edit.scss";

</style>
