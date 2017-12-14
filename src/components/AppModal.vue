<template>
  <transition name="Modal">
   <div class="modal-mask">
     <div class="modal-wrapper">
       <div class="modal-container">
         <div class="modal-header">
            <button class="button" @click="$emit('close')">╳</button>
         </div>
         <div class="modal-body">
           <slot name="body">
             You don't enough coins to buy anything ☹️
           </slot>
         </div>
         <div class="modal-footer">
           <slot name="footer">
             <button class="button button-blue" @click="$emit('getCoins')">
               Get More!
             </button>
           </slot>
         </div>
       </div>
     </div>
   </div>
  </transition>
</template>

<script>
export default {
  name: 'AppModal',
};
</script>

<style lang="css">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  text-align: right;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
