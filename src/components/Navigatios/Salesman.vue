<template>
    <div class="pb-15">
            <v-snackbar
          v-model="snackbar"
          :vertical="vertical"
          :centered="true"
          :timeout="3000"
          center
          shaped
          color="red lighten-1"
        >
          {{ textbar }}
      </v-snackbar>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-subtitle>
              <v-row class="pl-3 pr-5 pt-2 mr-5">
                <h5 class="tText">Usuarios</h5>
              </v-row>
            </v-card-subtitle>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row>
        <v-col>
          <h1 class="tText">Administración Mercaderistas</h1>
        </v-col>
        <v-col class="align-self-center">
          <v-row class="justify-end">

            <v-dialog v-model="dialogProduct" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-2 text-capitalize"
                medium
                elevation="1"
                color="#ffba69"
                v-bind="attrs"
                v-on="on"
                @click="NewUser"
              >
                <v-icon left>mdi-account-multiple-plus</v-icon>
                Nuevo
              </v-btn>
            </template>
              <ValidationObserver
                ref="observer"
                tag="form"
                novalidate
                @reset.prevent="reset"
                v-slot="{ handleSubmit }"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ title }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="nombre"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="editedUser.nombre"
                              name="nombre"
                              label="Nombre y Apelliido*"
                              prepend-icon="mdi-account"
                              color="accent darken-1"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="idVendedor"
                            rules="required|numeric"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="editedUser.idVendedor"
                              name="idVendedor"
                              label="Cód Vendedor*"
                              prepend-icon="mdi-shield-account"
                              required
                              color="accent darken-1"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="codigoDeValidacion"
                            rules="required|numeric"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="editedUser.codigoDeValidacion"
                              name="codigoDeValidacion"
                              label="Código de Validación*"
                              prepend-icon="mdi-code-array"
                              required
                              color="accent darken-1"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="estado"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              v-model="computedStatus"
                              name="estado"
                              :items="['ACTIVO', 'INACTIVO']"
                              label="Estado*"
                              prepend-icon="mdi-format-list-checks"
                              required
                              color="accent darken-1"
                              :menu-props="{ top: false, offsetY: true }"
                              :error-messages="errors"
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="dispositivo"
                            rules="numeric|digits:10"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="editedUser.dispositivo"
                              name="dispositivo"
                              label="Teléfono"
                              prepend-icon="mdi-cellphone-android"
                              required
                              color="accent darken-1"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="TipoVenta"
                            v-slot="{ errors }"
                          >
                            <v-select
                              v-model="computedSales"
                              name="TipoVenta"
                              label="Tipo de Venta"
                              :items="['PRE-VENTA', 'POS-VENTA']"
                              prepend-icon="mdi-sale"
                              required
                              color="accent darken-1"
                              :error-messages="errors"
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                        <!-- <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="supervisor"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              v-model="computedSupervisor"
                              name="supervisor"
                              :items="['ACTIVO', 'INACTIVO']"
                              label="Supervisor"
                              prepend-icon="mdi-account-star"
                              required
                              color="accent darken-1"
                              :menu-props="{ top: false, offsetY: true }"
                              :error-messages="errors"
                            ></v-select>
                          </ValidationProvider>
                        </v-col> -->
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="tipoRuta"
                            rules="required|numeric"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="editedUser.tipoRuta"
                              name="tipoRuta"
                              label="Tipo de Ruta*"
                              prepend-icon="mdi-subway-variant"
                              required
                              color="accent darken-1"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="tipoSalesman"
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-select
                              v-model="computedTypeSalesman"
                              name="tipoSalesman"
                              :items="['USUARIO', 'EVENTO', 'BANCO']"
                              label="Tipo de Mercaderista*"
                              prepend-icon="mdi-account-card-details"
                              required
                              color="accent darken-1"
                              :menu-props="{ top: false, offsetY: true }"
                              :error-messages="errors"
                            ></v-select>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="responsable"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="editedUser.responsable"
                              name="responsable"
                              label="Responsable"
                              prepend-icon="mdi-account-circle"
                              color="accent darken-1"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" class="pt-0 pb-0">
                          <ValidationProvider
                            name="direccion"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              v-model="editedUser.direccion"
                              name="direccion"
                              label="Dirección"
                              prepend-icon="mdi-sign-direction"
                              color="accent darken-1"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="accent darken-1" text @click="close('P')"
                      >Salir</v-btn
                    >
                    <v-btn
                      color="accent darken-1"
                      dark
                      @click="handleSubmit(save)"
                      >Guardar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </ValidationObserver>
            </v-dialog>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="justify-lg-space-between">
        <v-col class="pb-2">
          <v-card class="rounded-xl pa-3" rounded="true">
            <v-row class="align-baseline justify-space-between">
              <v-col cols="5" lg="4">
                <h3 class="tText pl-3">Usuarios</h3>
              </v-col>
              <v-col class="text-top pr-3" lg="7">
                <v-text-field
                  v-model="searchQuery"
                  dense
                  append-icon="mdi-magnify"
                  placeholder="Buscar"
                  outlined
                  color="accent"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-data-table
              :headers="headersSalesmen"
              :items="UserList"
              item-key="id"
              class="elevation-0"
              light
              :fixed-header="true"
              :loading="loadingUsers"
              :search="searchQuery"
            >
            <template v-slot:item.tipoSalesman="{ item }">
              {{ item.tipoSalesman=="user"?"Usuario": item.tipoSalesman=="event"?"Evento": item.tipoSalesman=="bank"?"Banco":"-" }}
            </template>

            <template v-slot:item.tipoVenta="{ item }">
              {{ item.tipoVenta != null? item.tipoVenta + "-Venta" : "-" }}
            </template>

            <template v-slot:item.direccion="{ item }">
              {{ item.direccion != null? item.direccion : "-" }}
            </template>

            <template v-slot:item.responsable="{ item }">
              {{ item.responsable != null? item.responsable : "-" }}
            </template>


              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small color="accent" class="mr-2" @click="EditUser(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small color="success" v-if="item.estado=='A'" @click="DesactivateUser(item)">
                  mdi-marker-check
                </v-icon>
                 <v-icon  color="error" v-if="item.estado=='D'" @click="ActivateUser(item)">
                  mdi-bookmark-remove
                </v-icon>
              </template>
              <template v-slot:no-data>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import { mapGetters, mapMutations } from "vuex";
  import { http } from "@/plugins/axios";
  import { userInfo } from "os";
    
  export default {
    //VALIDATE COMPONENTS FOR INPUT VALUES
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    //GET NECESARY INFO FROM SERVER
    created() {
      this.getUsers();
      console.log(userInfo);
    },
    // SET DEFAULT VARIABLES TO MANAGE THE INFORMATION
    data() {
      return {
        step: 1,
        dialog: false,
        snackbar: false,
        textbar: 'Lorem ipsum dolor sit amet',
        vertical: true,
        searchQuery: "",
        resumeComplete: false,
        loadingData: false,
        lockUp: false,
        title: "",
        loadingUsers: false,
        errorList: [],
        successList: [],
        lockFinishOptions: true,
        errorDownloadLink: "",
        file: undefined,
        MessageCambioEstad:"Eliminar Usuario",
        headersSalesmen: [
          {
            text: "CÓD VENDEDOR",
            sortable: true,
            align: "center",
            value: "idVendedor",
          },
          { text: "NOMBRE Y APELLIDO",
            align: "start",
            sortable: true,
            value: "nombre", 
          },
          {
            text: "TIPO DE MERCADERISTA",
            sortable: true,
            align: "center",
            value: "tipoSalesman",
          },
          {
            text: "TIPO DE VENTA",
            sortable: true,
            align: "center",
            value: "tipoVenta",
          },
          {
            text: "TIPO DE RUTA",
            sortable: true,
            align: "center",
            value: "tipoRuta",
          },
          {
            text: "DIRECCIÓN",
            sortable: true,
            align: "center",
            value: "direccion",
          },
          {
            text: "RESPONSABLE",
            sortable: true,
            align: "center",
            value: "responsable",
          },
          { text: "ACCIONES",
            sortable: false,
            align: "center",
            value: "actions",
          },
        ],
        UserList: [],
        dialogProduct: false,
        eraseDialog: false,
        editedUser: {
          id:0,
          idVendedor: "",
          nombre: "",
          codigoDeValidacion: "",
          idUser: null,
          estado: "",
          dispositivo: "",
          tipoSalesman: '',
          tipoVenta: null,
          supervisor: null,
          tipoRuta: null,
          responsable: null,
          direccion: null,
        },
        defaultItem: {
          id:0,
          idVendedor: "",
          nombre: "",
          codigoDeValidacion: "",
          idUser: null,
          estado: "A",
          dispositivo: "",
          tipoSalesman: '',
          tipoVenta: null,
          supervisor: null,
          tipoRuta: null,
          responsable: null,
          direccion: null,
        },
      };
    },


    computed: {
      ...mapGetters(["getUserData"]),
      computedSales: {
        get() {
          return this.getSalesFromData();
        },
        set(newValue) {
          this.setSalesFromData(newValue);
        },
      },

      computedStatus: {
        get() {
          return this.getStatusFromData();
        },
        set(newValue) {
          this.setStatusFromData(newValue);
        },
      },

      computedSupervisor: {
        get() {
          return this.getSupervisorFromData();
        },
        set(newValue) {
          this.setSupervisorFromData(newValue);
        },
      },

      computedTypeSalesman: {
        get() {
          return this.getTypeSalesmanFromData();
        },
        set(newValue) {
          this.setTypeSalesmanFromData(newValue);
        },
      },
    },


    methods: {
      //GET USERS DATA
      async getUsers() {
        try {
          this.loadingUsers = true;
          var idAcc = parseInt(this.getUserData.idAccount, 10);
          var idDistr = parseInt(this.getUserData.idDistribuidor, 10);
          console.log("Id Distribuidor: " + idDistr);
  
          const response = await http.get(`/Salesmen/Users?IdAccount=${idAcc}`);

          if (response.status === "Success") {
            this.UserList = response.data;
          } else {
            throw response.messege;
          }
        } catch (dataError) {
          alert(dataError);
        } finally {
          this.loadingUsers = false;
        }
      },
      
      NewUser(){
        this.title = "Nuevo Usuario";
      },

      // REALIZA UN PROGRESS LOADIND A NIVEL DE RAÍZ
      ...mapMutations(["setLoading"]),

      //OBTENER EL ITEM DE ESTADO
      getStatusFromData() {
        var formatStatus = "";
        if (this.editedUser.estado === "A") {
          formatStatus = "ACTIVO";
        } else if (this.editedUser.estado === "D") {
          formatStatus = "INACTIVO";
        }
      return formatStatus;
      },

      //AGREGAR NUEVO VALOR DE STATUS
      setStatusFromData(statusData) {
        if (statusData === "ACTIVO") {
          this.editedUser.estado = "A";
        } else if (statusData === "INACTIVO") {
          this.editedUser.estado = "D";
        }
      },

      //OBTENER EL TIPOVENTA DE ESTADO
      getSalesFromData() {
        var formatStatus = "";
        if (this.editedUser.tipoVenta === "PRE") {
          formatStatus = "PRE-VENTA";
        } else if (this.editedUser.tipoVenta === "POS") {
          formatStatus = "POS-VENTA";
        }
      return formatStatus;
      },

      //AGREGAR NUEVO VALOR AL TIPO DE Venta
      setSalesFromData(statusData) {
        if (statusData === "PRE-VENTA") {
          this.editedUser.tipoVenta = "PRE";
        } else if (statusData === "POS-VENTA") {
          this.editedUser.tipoVenta = "POS";
        }
      },

      //OBTENER EL SUPERVISOR DE ESTADO
      getSupervisorFromData() {
        var formatStatus = "";
        if (this.editedUser.supervisor === "A") {
          formatStatus = "ACTIVO";
        } else if (this.editedUser.supervisor === "D") {
          formatStatus = "INACTIVO";
        }
      return formatStatus;
      },

      //AGREGAR NUEVO VALOR AL TIPO DE SUPERVISOR
      setSupervisorFromData(statusData) {
        if (statusData === "ACTIVO") {
          this.editedUser.supervisor = "A";
        } else if (statusData === "INACTIVO") {
          this.editedUser.supervisor = "D";
        }
      },
      
      //OBTENER EL SUPERVISOR DE MERCADERISTA
      getTypeSalesmanFromData() {
        var formatStatus = "";
        if (this.editedUser.tipoSalesman === "user") {
          formatStatus = "USUARIO";
        } else if (this.editedUser.tipoSalesman === "event") {
          formatStatus = "EVENTO";
        } else if (this.editedUser.tipoSalesman == "bank") {
          formatStatus = "BANCO";
        }
      return formatStatus;
      },

      //AGREGAR NUEVO VALOR AL TIPO DE MERCADERISTA
      setTypeSalesmanFromData(statusData) {
        if (statusData === "USUARIO") {
          this.editedUser.tipoSalesman = "user";
        } else if (statusData === "EVENTO") {
          this.editedUser.tipoSalesman = "event";
        } else if (statusData == "BANCO") {
          this.editedUser.tipoSalesman = "bank";
        }
      },



      //SET THE CURRENT USER TO BE EDITED
      EditUser(item) {
        console.log(item);
        this.title = "Editar Usuario";
        this.editedUser = Object.assign({}, item);
        this.dialogProduct = true;
      },
  
      async ActivateUser(item) {
        this.editedUser = Object.assign({}, item);
        this.editedUser.estado = "A"
        this.MessageCambioEstad="Activar Usuario"
        this.eraseDialog = true;

        try {
          this.setLoading(true);
          var idAcc = parseInt(this.getUserData.idAccount, 10);
          var idDistr = parseInt(this.getUserData.idDistribuidor, 10);
          this.editedUser.tipoRuta = parseInt(this.editedUser.tipoRuta);

          await http.post(`/Salesmen/RegisterEditUser?IdAccount=${idAcc}&idDistribuitor=${idDistr}`, this.editedUser);
          this.getUsers();
        } catch (e) {
          alert(e);
        } finally {
          this.setLoading(false);
        }
      },

      async DesactivateUser(item) {
        this.editedUser = Object.assign({}, item);
        this.editedUser.estado = "D"
        this.MessageCambioEstad="Desactivar Usuario"
        this.eraseDialog = true;
        try {
          this.setLoading(true);
          var idAcc = parseInt(this.getUserData.idAccount, 10);
          var idDistr = parseInt(this.getUserData.idDistribuidor, 10);
          this.editedUser.tipoRuta = parseInt(this.editedUser.tipoRuta);

          await http.post(`/Salesmen/RegisterEditUser?IdAccount=${idAcc}&idDistribuitor=${idDistr}`, this.editedUser);
          this.getUsers();
        } catch (e) {
          alert(e);
        } finally {
          this.setLoading(false);
        }
      },


      //SET DEFAULT ITEMS TO EMPTY DATA BY TYPE
      close(type) {
        if (type === "P") {
          this.dialogProduct = false;
          requestAnimationFrame(() => {
            this.$refs.observer.reset();
          });
        } else if (type === "E") {
          this.eraseDialog = false;
        }
        this.$nextTick(() => {
          this.editedUser = Object.assign({}, this.defaultItem);
        });
      },
  
        
      //GUARDAR LOS CAMBIOS O EL NUEVO MERCADERISTA A LA LISTA
      async save() {
        var valid = this.$refs.observer.validate();         
        if (!valid) return;
        try {
          this.setLoading(true);
          this.editedUser["idaccount"] = parseInt(this.getUserData.idAccount, 10);
          var idAcc = parseInt(this.getUserData.idAccount, 10);
          var idDistr = parseInt(this.getUserData.idDistribuidor, 10);
          this.editedUser.tipoRuta = parseInt(this.editedUser.tipoRuta);
          var type = "";
          if (this.editedUser.id > 0) { //EDITAR ITEM
            type = "U";
          } else { //AÑADIR NUEVO
            type = "I";
          }

          const transactionData = {
            transaction: type,
            salesman: this.editedUser,
          };

          await http.post(`/Salesmen/RegisterEditUser?IdAccount=${idAcc}&idDistribuitor=${idDistr}`, transactionData.salesman);
          this.getUsers();
        } catch (e) {
          alert(e);
        } finally {
          this.close("P");
          this.setLoading(false);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .tText {
    color: #232365;
    font-weight: 500;
    letter-spacing: 1px;
  }
  </style>