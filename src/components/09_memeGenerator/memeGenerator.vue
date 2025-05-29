<template>
  <div class="meme-generator">
    <h2>Generador de Memes</h2>
    <div class="meme-form">
      <input v-model="topText" placeholder="Texto superior" />
      <input v-model="bottomText" placeholder="Texto inferior" />
      <input type="file" @change="onImageChange" accept="image/*" />
      <button @click="generateMeme">Generar Meme</button>
    </div>
    <div v-if="memeUrl" class="meme-preview">
      <div class="meme-image-wrapper">
        <img :src="memeUrl" alt="Meme" ref="memeImage" />
        <div class="meme-text top">{{ topText }}</div>
        <div class="meme-text bottom">{{ bottomText }}</div>
      </div>
      <button @click="downloadMeme">Descargar Meme</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemeGenerator",
  data() {
    return {
      topText: "",
      bottomText: "",
      image: null,
      memeUrl: null,
    };
  },
  methods: {
    onImageChange(e) {
      const file = e.target.files[0];
      if (file) {
        this.image = file;
        this.memeUrl = URL.createObjectURL(file);
      }
    },
    generateMeme() {
      // El meme se genera visualmente, para descargar se renderiza en canvas
    },
    downloadMeme() {
      const img = this.$refs.memeImage;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      // Texto superior
      ctx.font = `${canvas.width / 10}px Impact`;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.textAlign = 'center';
      ctx.lineWidth = 4;
      ctx.textBaseline = 'top';
      ctx.strokeText(this.topText, canvas.width / 2, 10);
      ctx.fillText(this.topText, canvas.width / 2, 10);
      // Texto inferior
      ctx.textBaseline = 'bottom';
      ctx.strokeText(this.bottomText, canvas.width / 2, canvas.height - 10);
      ctx.fillText(this.bottomText, canvas.width / 2, canvas.height - 10);
      const link = document.createElement('a');
      link.download = 'meme.png';
      link.href = canvas.toDataURL();
      link.click();
    },
  },
};
</script>

<style scoped>
.meme-generator {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}
.meme-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
.meme-preview {
  position: relative;
}
.meme-image-wrapper {
  position: relative;
  display: inline-block;
}
.meme-image-wrapper img {
  max-width: 100%;
  display: block;
}
.meme-text {
  position: absolute;
  left: 50%;
  width: 90%;
  color: white;
  font-family: Impact, Arial, sans-serif;
  font-size: 2em;
  text-shadow: 2px 2px 4px #000;
  text-align: center;
  pointer-events: none;
  user-select: none;
  padding: 0 5%;
}
.meme-text.top {
  top: 10px;
  transform: translateX(-50%);
}
.meme-text.bottom {
  bottom: 10px;
  transform: translateX(-50%);
}
</style>
