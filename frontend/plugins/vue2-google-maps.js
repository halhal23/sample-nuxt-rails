import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC0mCIH2nIt1xBCl8EeGH29-BVOPJlro5k',
    libraries: 'places', 
  },
})