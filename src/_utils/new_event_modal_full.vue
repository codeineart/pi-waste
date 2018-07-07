<template>
  <!-- NEW EVENT FORM DIALOG -->
  <v-dialog v-model="showNewEventForm" max-width="500px">
    <v-card>
      <v-container>
        <v-layout row wrap>
          <!-- TITULO -->
          <v-flex xs12>
            <h2 class="text-xs-center form-header--big">Añadir Evento</h2>
            <!-- <span>{{ jwt }}</span> -->
          </v-flex>
          <!-- NOMBRE DEL EVENTO -->
          <v-flex xs6>
            <v-text-field label="Título del evento"></v-text-field>
          </v-flex>

          <!-- DESCRIPCIÓN DEL EVENTO -->
          <v-flex xs12>
            <label class="input-group" for="event-textarea">Descripción del evento</label>
            <textarea ref="event_textarea_ref" name="event-textarea" id="" cols="30" rows="5"></textarea>
            <!-- <v-text-field label="Descripción del evento"></v-text-field> -->
          </v-flex>

          <!-- FECHA INICIO -->
          <v-flex xs6>
            <v-menu ref="start_date" :close-on-content-click="false" v-model="calInputs.start.showInput.date" :nudge-right="40" :return-value.sync="calInputs.start.date" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field slot="activator" v-model="calInputs.start.date" label="Fecha de Inicio" prepend-icon="event" readonly></v-text-field>
              <v-date-picker :first-day-of-week="1" locale="es-cl" color="orange" v-model="calInputs.start.date" @input="$refs.start_date.save(calInputs.start.date)"></v-date-picker>

            </v-menu>
          </v-flex>

          <!-- HORA INICIO -->
          <v-flex xs6>
            <v-menu ref="start_time" :close-on-content-click="false" v-model="calInputs.start.showInput.time" :nudge-right="40" :return-value.sync="calInputs.start.time" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="calInputs.start.time" label="Hora de Inicio" prepend-icon="access_time" readonly></v-text-field>
              <v-time-picker color="orange" v-model="calInputs.start.time" @change="$refs.start_time.save(calInputs.start.time)"></v-time-picker>
            </v-menu>
          </v-flex>

          <!-- FECHA FINAL -->
          <v-flex xs6>
            <v-menu ref="end_date" :close-on-content-click="false" v-model="calInputs.end.showInput.date" :nudge-right="40" :return-value.sync="calInputs.end.date" lazy transition="scale-transition" offset-y full-width min-width="290px">
              <v-text-field slot="activator" v-model="calInputs.end.date" label="Fecha de Inicio" prepend-icon="event" readonly></v-text-field>
              <v-date-picker :first-day-of-week="1" locale="es-cl" color="orange" v-model="calInputs.end.date" @input="$refs.end_date.save(calInputs.end.date)"></v-date-picker>

            </v-menu>
          </v-flex>

          <!-- HORA FINAL -->
          <v-flex xs6>
            <v-menu ref="end_time" :close-on-content-click="false" v-model="calInputs.end.showInput.time" :nudge-right="40" :return-value.sync="calInputs.end.time" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">
              <v-text-field slot="activator" v-model="calInputs.end.time" label="Hora de Inicio" prepend-icon="access_time" readonly></v-text-field>
              <v-time-picker color="orange" v-model="calInputs.end.time" @change="$refs.end_time.save(calInputs.end.time)"></v-time-picker>
            </v-menu>
          </v-flex>

          <!-- VISIBILIDAD ROL MASTER -->
          <v-flex xs12 v-if="jwt.role == 'master'">
            <v-container>
              <v-layout row class="form-header">
                <v-flex xs6 d-flex align-center>
                  Visibilidad
                </v-flex>

                <v-flex d-flex xs6 row justify-end="" align-center="">

                  <!-- <v-tooltip top>
                                <span slot="activator">
                                  <v-icon style="color:grey;cursor:pointer;s">language</v-icon>
                                </span>
                                <span>¿El evento es público?</span>
                              </v-tooltip>
                              <v-switch v-model="isFilePublic" hide-details></v-switch> -->

                  <v-tooltip top>
                    <span slot="activator">
                      <v-icon style="color:grey;cursor:pointer;">language</v-icon>
                    </span>
                    <span>El evento será visualizado por todos los usuarios de la intranet, sin excepción.</span>
                  </v-tooltip>

                  <span>¿Evento público?</span>

                  <v-checkbox style="width:0;" class="shrink" v-model="isFilePublic" color="orange" :value="true" hide-details></v-checkbox>

                </v-flex>
              </v-layout>
              <br>
              <!-- TO-DO: use a f*cking v-for for goodsakes! -->
              <v-layout class="availability-checkboxes" row wrap>
                <v-flex xs6 :class="{ cursorNotAllowed: isFilePublic }">
                  <v-checkbox v-model="formEventAvailability" label="HSEC" color="orange" value="hsec" hide-details :disabled="isFilePublic"></v-checkbox>
                </v-flex>
                <v-flex xs6 :class="{ cursorNotAllowed: isFilePublic }">
                  <v-checkbox v-model="formEventAvailability" label="Calidad" color="orange" value="calidad" hide-details :disabled="isFilePublic"></v-checkbox>
                </v-flex>
                <v-flex xs6 :class="{ cursorNotAllowed: isFilePublic }">
                  <v-checkbox v-model="formEventAvailability" label="Recursos Humanos" color="orange" value="rrhh" hide-details :disabled="isFilePublic"></v-checkbox>
                </v-flex>
                <v-flex xs6 :class="{ cursorNotAllowed: isFilePublic }">
                  <v-checkbox v-model="formEventAvailability" label="Contabilidad" color="orange" value="contabilidad" hide-details :disabled="isFilePublic"></v-checkbox>
                </v-flex>
                <v-flex xs6 :class="{ cursorNotAllowed: isFilePublic }">
                  <v-checkbox v-model="formEventAvailability" label="Compras" color="orange" value="compras" hide-details :disabled="isFilePublic"></v-checkbox>
                </v-flex>
                <v-flex xs6 :class="{ cursorNotAllowed: isFilePublic }">
                  <v-checkbox v-model="formEventAvailability" label="Maquinarias" color="orange" value="maquinarias" hide-details :disabled="isFilePublic"></v-checkbox>
                </v-flex>
                <v-flex xs6 :class="{ cursorNotAllowed: isFilePublic }">
                  <v-checkbox v-model="formEventAvailability" label="Remuneraciones" color="orange" value="remuneraciones" hide-details :disabled="isFilePublic"></v-checkbox>
                </v-flex>
                <v-flex xs6 :class="{ cursorNotAllowed: isFilePublic }">
                  <v-checkbox v-model="formEventAvailability" label="Gerente General" color="orange" value="gerente_general" hide-details :disabled="isFilePublic"></v-checkbox>
                </v-flex>
              </v-layout>
              <!-- TO-DO: Display based on database configs -->
            </v-container>

          </v-flex>

          <!-- <v-flex xs12>
                        <h6> Placeholder </h6>
                      </v-flex> -->

          <v-flex xs6 d-flex>
            <v-btn class="form-btn">Cancelar</v-btn>
          </v-flex>
          <v-flex xs6 d-flex>
            <v-btn class="form-btn">Guardar</v-btn>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>
