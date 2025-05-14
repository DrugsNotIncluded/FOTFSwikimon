<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import axios from 'axios'

const mcurl = "https://api.minetools.eu/ping/ForgedSeas.cubed.pro/25565";
let date = new Date();
let timestring = ""

const godsList = ["GodlyCupOfTea", "Sakura_Eby" ,"SakuraEby"];

const serverData = ref(false)


async function populateServerData() {
    await axios.get(mcurl)
    .then(function (response) {
      let temp_data = response.data
      let filtered = temp_data.players.sample.filter(player => !godsList.includes(player.name))
      temp_data.players.sample = filtered
      serverData.value = temp_data
    })
}

onMounted(async () => {
  await populateServerData()
  let time = date.getTime()
  date.setTime(time)
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let timestring = hour + ':' + minutes
  console.log(timestring)
  setInterval(() => {
    let time = date.getTime()
    date.setTime(time)
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let timestring = hour + ':' + minutes
    populateServerData()
  }, 30000);
})

</script>

<template>
  <!doctype html>
  <html lang="en">
    <div class="container-fluid text-center">
      <div class="row align-items-start">
    <div class="col">
      <div class="card" style="width: 30rem">
        <img src="/src/card.png" class="card-img-top">
        <div class="card-body">
          <div class="btn-group d-flex justify-content-center" role="group" aria-label="Basic example">
            <a type="button" class="btn" href="https://discord.com/invite/8aS5uetw" style="background-color: #7289da">Discord</a>
            <a type="button" class="btn" href="https://github.com/DrugsNotIncluded/Factions-Of-The-Forged-Seas" style="background-color: #fafbfc; color: black;">Github</a>
            <a type="button" class="btn" href="https://www.curseforge.com/minecraft/modpacks/factions-of-the-forged-seas" style="background-color: #f16436">Curseforge</a>
            <a type="button" class="btn" href="https://www.technicpack.net/modpack/factions-of-the-forged-seas.2002123" style="background-color: #1389d2">Technicpack</a>
            <a type="button" class="btn" href="" style="background-color: #1bd96a; color: black;">Modrinth</a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-3">
      <body>
        <template v-if="serverData.players != null">
          <div class="alert alert-success"> {{ timestring }} Players online:</div>
          <ul class="list-group">
            <li class="list-group-item" v-for="player in serverData.players.sample">
              {{ player.name }}
            </li>
          </ul>
        </template>
        <template v-if='serverData.error != null'>
          <div class="alert alert-danger">Server offline</div>
        </template>
      </body>
    </div>
    <div class="col">
    </div>
  </div>
  </div>
  </html>
</template>