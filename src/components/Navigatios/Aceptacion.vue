<template>
  <div class="pb-15">
       <v-snackbar
        v-model="snackbar"
        :vertical="vertical"
        :centered="true"
        :timeout="3000"
        top
        shaped
        :color="tipoMensaje"
      >
        {{ textbar }}
    </v-snackbar>
    <v-row class="justify-lg-space-between">
      <v-col lg="7" cols="sm" class="pb-2">
        <v-card class="rounded-xl pa-3" rounded="true">
          <v-row class="align-baseline justify-space-between" lg="12" style="margin-left: 10px;margin-right: 10px;">
              <v-text-field
                v-model="searchQuery"
                dense
                append-icon="mdi-magnify"
                placeholder="Buscar"
                outlined
                color="accent"
              ></v-text-field>
          </v-row>
          <v-row style="margin-left: 0px;">
            <v-col lg="6">
              <v-checkbox :label="lblestado" v-model="cbxvalor" @change="cambioEstado()" cambioEstado></v-checkbox>
            </v-col>
            <v-col lg="6">
              <v-switch :label="`${model}`" v-model="model" true-value="Finalizados" false-value="Pendientes" :disabled="!cbxvalor" @change="filtroEstado()"></v-switch>
            </v-col>
          </v-row>
          <v-data-table
            :headers="headersOrderAceptation"
            :items="OrdersAceptation"
            item-key="idorder"
            class="elevation-0"
            light
            :fixed-header="true"
            :loading="loadingAceptations"
            :search="searchQuery"
          >

          <template v-slot:[`item.des`]="{ item }" >
                <span v-if="item.description == 'ingreso'">Entrada</span>
                <span v-if="item.description == 'transferencia DD'">Transferencia T1</span>
                <span v-if="item.description == 'transferencia DM'">Transferencia T2</span>
                <span v-if="item.description == 'transferencia MD'">Devolución</span>
          </template>
          <template v-slot:[`item.foto`]="{ item }" >
                <span v-if="item.image !== null && item.image !== ''" >SI</span>
                <span v-if="item.image === null || item.image === ''">NO</span>
          </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-row>
                <v-icon
                  medium
                  class="mr-2"
                  :color="selectedReg === item ? 'accent' : 'gray'"
                  @click="showAceptation(item)"
                >
                  mdi-folder-multiple-outline
                </v-icon>
                <v-icon
                  medium
                  class="mr-2"
                  :color="selectedReg == item ? 'accent' : 'gray'"
                  @click="searchDetails(item)"
                >
                  mdi-clipboard-text
                </v-icon>
               </v-row>
            </template>
            <template v-slot:no-data>
              <v-btn color="info" dark @click="getAceptations"
                >Reintentar</v-btn
              >
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col lg="5" cols="sm" class="pb-2">
        <v-card class="rounded-xl pa-3" rounded="true">
          <v-row class="align-baseline justify-space-between">
            <v-col cols="5" lg="4">
              <h3 class="tText pl-3">Detalle del Pedido</h3>
            </v-col>
            <v-col class="text-right mr-3" lg="7">
           
            </v-col>
          </v-row>
          <v-data-table
            :headers="headersOrderDetailAceptation"
            :items="OrdersDetailAceptation"
            class="elevation-0"
            item-key="idorderdetail"
            :loading="loadingDetailAceptations"
            light
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-select
                v-model="item.aceptation"
                :items="itemsStates"
                label="Estado Pedido*"
                item-text="label"
                item-value="value"
                prepend-icon="mdi-cash-multiple"
                persistent-hint
                return-object
                single-line
                :menu-props="{ top: false, offsetY: true }"
                @change="actualizaEstado(item)"
              ></v-select>
            </template>
          </v-data-table>
          <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent darken-1" text @click="sendOrder('D')" :disabled="!OrdersDetailAceptation.length>0 || lockSave"
                    >Guardar</v-btn
                  >
                </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
            <v-dialog v-model="dialogOrder" persistent max-width="700px">
              <ValidationObserver ref="obs" v-slot="{ invalid,validated }">
              <v-card>
                <v-card-title >
                  <v-col cols="12" sm="12" md="12" class="pt-0 pb-0" style="text-align: center;">
                    <span class="headline">Datos del Pedido</span>
                  </v-col>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pt-0 pb-0" style="text-align: -webkit-center;">
                        <div class="image-container">
                        <v-img
                          width="100%"
                          :src="foto"
                        ></v-img>
                        </div>
                      </v-col>
                    </v-row>
                    <br>
                    <v-row>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                      <v-file-input 
                        label="Subir Foto*"
                        accept="image/png, image/jpeg"
                        variant="underlined" 
                        chips
                        prepend-icon="mdi-camera"
                        v-model="fotoPedido"
                        @change="cambiarFoto()"
                      ></v-file-input>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                        <ValidationProvider
                          name="estadopedido"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-select
                            v-model="selectedstate"
                            :items="itemsStatesOrder"
                            name="estadopedido"
                            required
                            label="Estado Pedido*"
                            item-text="label"
                            item-value="value"
                            prepend-icon="mdi-cash-multiple"
                            persistent-hint
                            return-object
                            single-line
                            @change="cambioEstadoPedido(selectedstate)"
                            :error-messages="errors"
                            :menu-props="{ top: false, offsetY: true }"
                          ></v-select>
                          </ValidationProvider>
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pt-0 pb-0">
                          <ValidationProvider
                          name="observacion"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-textarea
                            v-model="observationAceptation"
                            label="Observacion*"
                            name="observacion"
                            required
                            prepend-icon="mdi-comment"
                            color="accent darken-1"
                            type="text"
                            rows="3"
                            no-resize
                            :error-messages="errors"
                          ></v-textarea>
                          </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent darken-1" text @click="close('A')"
                    >Salir</v-btn
                  >
                  <v-btn color="accent darken-1" text @click="sendOrder('C')"
                    :dark="!invalid && validated"
                    :disabled="invalid || lockSave"
                  >Guardar</v-btn
                  >
                </v-card-actions>
              </v-card>
              </ValidationObserver>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  required, min, max, email, max_value,min_value
} from 'vee-validate/dist/rules'
import { extend } from 'vee-validate'
import { http } from "@/plugins/axios";

extend('required', required)
extend('email', email)
extend('min', min)
extend('max', max)
extend('max_value', max_value)
extend('min_value', min_value)

// var fileReader = new FileReader();

export default {
  //VALIDATE COMPONENTS FOR INPUT VALUES
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  //GET NECESARY INFO FROM SERVER
  created() {
    this.getAceptations();
  },
  // SET DEFAULT VARIABLES TO MANAGE THE INFORMATION
  data() {
    return {
      lblestado:"Sin Estado",
      cbxvalor:false,
      model:"Pendiente",
      tipoColor:"red",
      snackbar: false,
      fltStatus:"pendiente",
      textbar: "",
      vertical: true,
      tipoMensaje:"green",
      step: 1,
      headersOrderAceptation:[
        {text: "DESCRIPCION",  value: "des", align: "left", sortable: true},
        // {text: "DESCRIPCION",  value: "description", align: "left", sortable: true},
        { text: "ESTADO", value: "status", align: "center", sortable: true},
        { text: "FOTO", value: "foto", align: "center", sortable: true},
        { text: "ORIGEN", value: "origiN_NAME", align: "center", sortable: true},
        { text: "DESTINO", value: "destinatioN_NAME", align: "center", sortable: true},
        { text: "ACCIONES", value: "actions", align: "center",sortable: false}
      ],
      OrdersAceptation:[],
      loadingAceptations: false,
      headersOrderDetailAceptation:[
        //{text: "DESCRIPCION",  value: "description", align: "left", sortable: true},
        // { text: "ESTADO", value: "aceptation", align: "center", sortable: true},
        { text: "PRODUCTO", value: "nameProduct", align: "left", sortable: true},
        { text: "CANTIDAD", value: "quantity", align: "center", sortable: true},
        { text: "ESTADO MATERIAL", value: "statusmaterial", align: "center", sortable: true},
        { text: "ACCIONES", value: "actions", align: "center",sortable: false}
      ],
      OrdersDetailAceptation:[],
      loadingDetailAceptations: false,
      searchQuery: "",
      selectedRouteData: null,
      dialogOrder: false,
      fotoPedido: [],
      foto: "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png",
      selectedstate:"",
      itemsStates:[],
      itemsStatesOrder:[],
      observationAceptation:"",
      selectedReg:null,
      banderaSubirFoto:false,
      lockSave:false,
    };
  },
  // OBSERVER FOR FILE IMPORT DATA
  watch: {
    file(newVal) {
      if (newVal === undefined) {
        this.uploadData = null;
        this.lockUp = false;
      }
    },
  },
  computed: {
    //GET DATA FROM USER STORE
    ...mapGetters(["getUserData"]),

    //CHECK IF THE FILE IS READY TO UPLOAD
    fileInput() {
      return this.file === undefined;
    },

    //CHECK IF A STATE ROUTE IS CHOISED
    parsedState() {
      return this.uploadData === null;
    },

    //TRANSFORM OPTION TO HIDE OR SHOW STATUS ROUTE
    computedOption: {
      get() {
        return this.selectOption;
      },
      set(newValue) {
        this.setOption(newValue);
      },
    },

    //TRANSFORM THE SELECT CAMPAIGN INTO A VALID DATA
    computedCampaign: {
      get() {
        return this.selectCampaign === null ? "" : this.selectCampaign;
      },
      set(newValue) {
        this.selectCampaign = newValue;
      },
    },

    //TRANSFORM ROUTE STATE TO VALID DATA
    computedState: {
      get() {
        return this.selectState === null ? "" : this.selectState;
      },
      set(newValue) {
        this.selectState = newValue;
      },
    },
  },
  methods: {
    ...mapMutations(["setLoading"]),
    async getAceptations() {
      this.setLoading(true);
      try {
        this.loadingAceptations = true;
        var idAcc = parseInt(this.getUserData.idAccount, 10);

        const response = await http.get(`/surti/LoadAceptations?idaccount=${idAcc}&iduser=${this.getUserData.idUser}`);
        if (response.status === "Ok") {
          this.OrdersAceptation = []
          console.log('hola',response.data);
          if(this.cbxvalor){
            let listaAux = [];
            response.data.forEach(element => {
              if(element.status == this.fltStatus){
                console.log("encontro candidato",this.fltStatus)
                listaAux.push(element);
              }
            });
            console.log(listaAux);
            if(listaAux.length > 0){
              this.OrdersAceptation = listaAux;
            }else{
              this.OrdersAceptation = [];
            }
            
          }else{
            this.OrdersAceptation = response.data;
          }
          console.log(this.OrdersAceptation);
        } else {
          throw response.messege;
        }
      } catch (dataError) {
        alert(dataError);
      } finally {
        this.loadingAceptations = false;
      }
      this.setLoading(false);
    },
    async searchDetails(item){
      this.lockSave = true;
      this.itemsStates = [];
      this.itemsStates.push({label: "PENDIENTE", value: "pendiente"});
      this.itemsStates.push({label: "ACEPTADO", value: "aceptado"});
      this.itemsStates.push({label: "RECHAZADO", value: "rechazado"});

        if(item.status == "finalizado"){
          this.lockSave = true;
        }else{
          this.lockSave = false;
        } 

      try {
        this.loadingDetailAceptations = true;

        const response = await http.get(`/surti/LoadDetailAceptations?id=${item.id}`);
        if (response.status === "Ok") {
          this.selectedReg = item;
          this.OrdersDetailAceptation = response.data;
          console.log(this.OrdersDetailAceptation);
        } else {
          throw response.messege;
        }
      } catch (dataError) {
        alert(dataError);
        this.lockSave = true;
      } finally {
        this.loadingDetailAceptations = false;
      }
    },
    cambioEstado(){
      if(this.cbxvalor){
        this.lblestado = 'Con Estado';
      }else{
        this.lblestado = 'Sin Estado';
      }
      this.getAceptations();
      this.OrdersDetailAceptation = [];
    },
    cambioEstadoPedido(item){
      this.selectedstate = item.value; 
      console.log(item);
    },
    filtroEstado(){
      console.log("model",this.model)
      if(this.model == 'Finalizados'){
        this.fltStatus = 'finalizado';
      }else{
        this.fltStatus = 'pendiente';
      }
      this.cambioEstado();
    },
    async showAceptation(item){
      //this.searchDetails(item)
      this.OrdersDetailAceptation = [];
      try {
        this.selectedReg = item;

        if(this.selectedReg.status == "finalizado"){
          this.lockSave = true;
        }else{
          this.lockSave = false;
        } 

        this.dialogOrder = true;
        this.itemsStatesOrder = [];
        this.itemsStatesOrder.push({label: "PENDIENTE", value: "pendiente"});
        this.itemsStatesOrder.push({label: "FINALIZADO", value: "finalizado"});
        
        if(item.image !== null && item.image !== ''){
          this.foto = item.image;
          this.banderaSubirFoto = true;
        }else{
          this.foto = ""
          this.banderaSubirFoto = false;
        }
        
        this.selectedstate = item.status;
        this.observationAceptation = item.observation;
        this.fotoPedido = null;
        console.log(item);
      } catch (dataError) {
        alert(dataError);
      } finally {
        this.loadingDetailAceptations = false;
      }
    },
        close(type) {
      if (type === "P") {
        this.dialogProduct = false;
        requestAnimationFrame(() => {
          this.$refs.observer.reset();
        });
      }
      else if (type === "A") {
        this.dialogOrder = false;
      }
      else if (type === "E") {
        this.eraseDialog = false;
      }
      else if (type === "O") {
        this.dialogRegOrder = false;
      }
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async cambiarFoto(){
      console.log(this.fotoPedido)
      this.foto = this.fotoPedido.name;
      if (!this.fotoPedido) {this.data = "No File Chosen"}
      let reader = new FileReader();
      // Use the javascript reader object to load the contents
      // of the file in the v-model prop
      reader.readAsDataURL(this.fotoPedido);
      reader.onload = () => {
        this.foto = reader.result;
        console.log(reader);
      }
    },

    actualizaEstado(item){
      item.aceptation = item.aceptation.value;
    },

    async sendOrder(tipo){
      this.setLoading(true);
      let fotosubir = this.foto.split(',')[1];

        let orderModel = {
          usuario: this.getUserData.idUser,
          order: {idorder: this.selectedReg.id,
            idaccount:this.getUserData.idAccount,
            description: this.selectedReg.description,
            status:this.selectedstate==undefined || this.selectedstate==null?"":this.selectedstate,
            observation:this.observationAceptation,
            image:fotosubir==undefined || fotosubir==null?this.foto:fotosubir,
            origin:this.selectedReg.origin,
            destination:this.selectedReg.destination},
          details:[]
        }

      console.log("DETALLE");
      console.log(this.fotoPedido);
      console.log(this.OrdersDetailAceptation);
      
      var listaDetalles = [];

      for(let j=0; j < this.OrdersDetailAceptation.length; j++){
        let item = {};
          item = {
            idorderdetail:this.OrdersDetailAceptation[j].idorderdetail,
            idorder:this.OrdersDetailAceptation[j].idorder,
            description:this.OrdersDetailAceptation[j].description,
            idproduct:this.OrdersDetailAceptation[j].idproduct.toString(),
            quantity: parseInt(this.OrdersDetailAceptation[j].quantity),
            movement:this.OrdersDetailAceptation[j].movement,
            option: 0,
            statusmaterial:this.OrdersDetailAceptation[j].statusmaterial,
            aceptation:this.OrdersDetailAceptation[j].aceptation,
            };  
        listaDetalles.push(item);
      }

      orderModel.details = listaDetalles;
      console.log(orderModel);

      if(tipo == 'C'){
        console.log("API DE CABECERA");  
        const response = await http.post(`/Surti/HeaderBodegaPedidosRegisEdit`, orderModel);
        if (response.status === "Ok") {
          this.dialogOrder = false;
          this.snackbar = true;
          this.textbar = 'El Pedido se Guardo Exitosamente'
          this.tipoMensaje = 'green'
          this.routeItems = response.data;
          console.log(response.data)
        } else {
          throw response.messege;
        }
      }else if(tipo == 'D'){
        console.log("API DE DETALLE")  
        const response = await http.post(`/Surti/DetailsBodegaPedidosRegisEdit`, orderModel);
        if (response.status === "Ok") {
          this.snackbar = true;
          this.textbar = 'El Detalle del Pedido se Guardo Exitosamente'
          this.routeItems = response.data;
          console.log(response.data)
        } else {
          throw response.messege;
        }
      }
      this.getAceptations();
      console.log(orderModel);
      this.setLoading(false);
    }
  },
};


</script>

<style scoped>
.tText {
  color: #232365;
  font-weight: 500;
  letter-spacing: 1px;
}
.image-container {
  max-height: 400px; /* Altura máxima del contenedor */
  overflow-y: auto; /* Habilitar el desplazamiento vertical */
}
</style>
