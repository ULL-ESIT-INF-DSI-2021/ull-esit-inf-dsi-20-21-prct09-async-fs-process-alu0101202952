import {access, constants, watch} from 'fs';


if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
  

// Traza realizada
/**
 * 1) Inicialización
 * 
 * ##############   #############   #########   #######
 * # Call Stack #   # Event Log #   # Queue #   # Out #
 * #------------#   #-----------#   #-------#   #-----#
 * #            #   #           #   #       #   #     #
 * ##############   #############   #########   #######
 * 
 * 
 * 2) El script manin() entra en la pilla de llamadas o Call Stack
 * 
 * ##############   #############   #########   #######
 * # Call Stack #   # Event Log #   # Queue #   # Out #
 * #------------#   #-----------#   #-------#   #-----#
 * #   main()   #   #           #   #       #   #     #
 * ##############   #############   #########   #######
 *
 *
 * 3) El script access() entraen la pilla de llamadas o Call Stack
 * 
 * ##############   #############   #########   #######
 * # Call Stack #   # Event Log #   # Queue #   # Out #
 * #------------#   #-----------#   #-------#   #-----#
 * #  access()  #   #           #   #       #   #     #
 * #  main()    #   #           #   #       #   #     #
 * ##############   #############   #########   #######
 *
 * 
 * 4) El script access() pasa al registro de eventos o Event Log
 * 
 * ##############   #############   #########   #######
 * # Call Stack #   # Event Log #   # Queue #   # Out #
 * #------------#   #-----------#   #-------#   #-----#
 * #  main()    #   #  access() #   #       #   #     #
 * ##############   #############   #########   #######
 *
 *
 * 5) El script main() sale de la pila de llamadas y pasa a la cola de manejadores como manejador de access, y access sale del registro de eventos
 * 
 * ##############   #############   ######################    #######
 * # Call Stack #   # Event Log #   #        Queue       #    # Out #
 * #------------#   #-----------#   #--------------------#    #-----#
 * #            #   #           #   # manejador de access#    #     #
 * ##############   #############   ######################    #######
 *
 *
 * 6) Al no haber manejadores y la pila estar vacía, el manejador acces pasa a la pila
 *
 * ######################   #############   ######################    #######
 * # Call Stack         #   # Event Log #   #        Queue       #    # Out #
 * #--------------------#   #-----------#   #--------------------#    #-----#
 * # manejador de access#   #           #   #                    #    #     #
 * ######################   #############   ######################    #######
 * 
 *
 * 7) Se ejecuta el manejador de access y entra en la pila la llamada console.log(`Starting to watch file ${filename}`)
 * 
 * ####################################################   #############   ######################    #######
 * # Call Stack                                       #   # Event Log #   #        Queue       #    # Out #
 * #--------------------------------------------------#   #-----------#   #--------------------#    #-----#
 * # console.log(`Starting to watch file ${filename}`)#   #           #   #                    #    #     #
 * # manejadore de access                             #   #           #   #                    #    #     #
 * ####################################################   #############   ######################    #######
 *
 *
 * 8) Se ejecuta el console.log(`Starting to watch file ${filename}`) y pasa a la salida del programa
 * 
 * ####################################################   #############   ######################    #################
 * # Call Stack                                       #   # Event Log #   #        Queue       #    # Out           #
 * #--------------------------------------------------#   #-----------#   #--------------------#    #---------------#
 * #           manejador de access                    #   #           #   #                    #    # watch file    #
 * ####################################################   #############   ######################    #################
 *                                                                             
 *
 * 9) La función watch(process.argv[2]) se introduce en la pila de llamadas
 *
 * ####################################################   #############   ######################    #################
 * # Call Stack                                       #   # Event Log #   #        Queue       #    # Out           #
 * #--------------------------------------------------#   #-----------#   #--------------------#    #---------------#
 * #           watch(process.agv[2])                  #   #           #   #                    #    # watch file    #
 * #       manejador de access                        #   #           #   #                    #    #               #
 * ####################################################   #############   ######################    #################
 * 
 *
 * 10) La función watch(process.argv[2]) se ejecuta y sale de la pila
 * 
 * ####################################################   #############   ######################    #################
 * # Call Stack                                       #   # Event Log #   #        Queue       #    # Out           #
 * #--------------------------------------------------#   #-----------#   #--------------------#    #---------------#
 * #           manejador de access                    #   #           #   #                    #    # watch file    #
 * ####################################################   #############   ######################    #################
 *
 *
 * 11) La función watcher.on('change') se introduce en la pila de llamadas
 * 
 * ####################################################   #############   ######################    #################
 * # Call Stack                                       #   # Event Log #   #        Queue       #    # Out           #
 * #--------------------------------------------------#   #-----------#   #--------------------#    #---------------#
 * #           watcher.on('change')                   #   #           #   #                    #    # watch file    #
 * #           manejador de access                    #   #           #   #                    #    #               #
 * ####################################################   #############   ######################    #################
 *
 *
 * 12) La función watcher.on('change') para al registro de eventos
 * 
 * ####################################################   ######################   ######################    #################
 * # Call Stack                                       #   # Event Log          #   #        Queue       #    # Out           #
 * #--------------------------------------------------#   #--------------------#   #--------------------#    #---------------#
 * #           manejador de access                    #   #watcher.on('change')#   #                    #    # watch file    #
 * ####################################################   ######################   ######################    #################
 * 
 *
 * 13) La función watcher.on('change') se queda esperando a que se edite el fichero, en escucha, el programa continúa ejecutándose en su linea y se introduce console.log(`File ${filename} is no longer watched`) en la pila de llamadas
 * 
 * ######################################################   ######################   ######################    #################
 * # Call Stack                                         #   # Event Log          #   #        Queue       #    # Out           #
 * #----------------------------------------------------#   #--------------------#   #--------------------#    #---------------#
 * #console.log(`File ${filename} is no longer watched`)#   #watcher.on('change')#   #                    #    # watch file    #
 * #           manejador de access                      #   #                    #   #                    #    #               #
 * ######################################################   ######################   ######################    #################
 *
 *
 * 14) La llamadad al console.log(`File ${filename} is no longer watched`) se ejecuta y pasa a la salida del programa, mostrándose el mensaje
 * 
 * ####################################################   ######################   ######################    #######################################
 * # Call Stack                                       #   # Event Log          #   #        Queue       #    # Out                                 #
 * #--------------------------------------------------#   #--------------------#   #--------------------#    #-------------------------------------#
 * #           manejador de access                    #   #watcher.on('change')#   #                    #    # watch file                          #
 * #                                                  #   #                    #   #                    #    #File ${filename} is no longer watched#
 * ####################################################   ######################   ######################    #######################################
 *
 *
 * 15) A continuación sale el manejador de access de la pila y como ya no hay nada que ejecutar el programa se queda en espera a los cambios del fichero y así activar el evento watcher.on('change'), se editaría el fichero y guardaría y el manejador de este evento pasa a la cola de manejadores
 * 
 * #################   ######################   #######################################################    #######################################
 * # Call Stack    #   # Event Log          #   #        Queue                                        #    # Out                                 #
 * #---------------#   #--------------------#   #-----------------------------------------------------#    #-------------------------------------#
 * #               #   #watcher.on('change')#   #                                                     #    # watch file                          #
 * #               #   #                    #   #console.log(`File ${filename} is no longer watched`) #    #File ${filename} is no longer watched#
 * #################   ######################   #######################################################    #######################################
 *
 *
 * 16)No hay manejadores y el manejador de el evento watcher.on pasa a la pila y se ejecuta
 * 
 * ######################################################   ######################   ########################    ########################################
 * # Call Stack                                         #   # Event Log          #   #        Queue         #    # Out                                  #
 * #----------------------------------------------------#   #--------------------#   #----------------------#    #--------------------------------------#
 * #console.log(`File ${filename} is no longer watched`)#   #watcher.on('change')#   #                      #    # watch file                           #
 * # manejador de watcher.on('change')                  #   #                    #   #                      #    #File ${filename} is no longer watched #
 * ######################################################   ######################   ########################    ########################################
 *
 *
 * 17) El manejador tras su ejecución sale de la pila y se comprueba que es un console.log, lo que indica que se introduce esto en la salida para mostrarse
 * 
 * ###################   ######################   ######################    ########################################
 * # Call Stack      #   # Event Log          #   #        Queue       #    # Out                                  #
 * #-----------------#   #--------------------#   #--------------------#    #--------------------------------------#
 * #                 #   #watcher.on('change')#   #                    #    # watch file                           #
 * #                 #   #                    #   #                    #    #File ${filename} is no longer watched #
 * #                 #   #                    #   #                    #    # file has been modified               #        
 * ###################   ######################   ######################    ########################################
 *
 *
 * 18) Se edita el fichero otra vez y guarda, esto vuelve a activar el evento de  watcher.on y su manejador para a la cola de manejadores
 * 
 * ###################   ######################   #########################    ########################################
 * # Call Stack      #   # Event Log          #   #        Queue          #    # Out                                  #
 * #-----------------#   #--------------------#   #-----------------------#    #--------------------------------------#
 * #                 #   #watcher.on('change')#   #manejador de watcher.on#    # watch file                           #
 * #                 #   #                    #   #                       #    #File ${filename} is no longer watched #
 * #                 #   #                    #   #                       #    # file has been modified               #        
 * ###################   ######################   #########################    ########################################
 *
 *
 * 19) No hay manejadores y el manejador de el evento watcher.on pasa a la pila y se ejecuta
 * 
 * ###########################################################   ######################   #################    ########################################
 * # Call Stack                                              #   # Event Log          #   #    Queue      #    # Out                                  #
 * #---------------------------------------------------------#   #--------------------#   #---------------#    #--------------------------------------#
 * #                                                         #   #watcher.on('change')#   #               #    # watch file                           #
 * #console.log(`File ${filename} has been modified somehow`)#   #                    #   #               #    #File ${filename} is no longer watched #
 * #manejador de watcher.on                                  #   #                    #   #               #    # file has been modified               #        
 * ###########################################################   ######################   #################    ########################################
 *
 *
 * 20) El manejador tras su ejecución sale de la pila y se comprueba que es un console.log, lo que indica que se introduce esto en la salida para mostrarse
 * 
 * ###################   ######################   #########################    #########################################
 * # Call Stack      #   # Event Log          #   #        Queue          #    # Out                                   #
 * #-----------------#   #--------------------#   #-----------------------#    #---------------------------------------#
 * #                 #   #watcher.on('change')#   #                       #    # watch file                            #
 * #                 #   #                    #   #                       #    #File ${filename} is no longer watched  #
 * #                 #   #                    #   #                       #    # file has been modified                #
 * #                 #   #                    #   #                       #    # file has been modified second time    #        
 * ###################   ######################   #########################    #########################################
 *
 *
 * 21) Se termina el programa y sale del registro de eventos el watcher.on
 * 
 * ###################   ######################   #########################    #########################################
 * # Call Stack      #   # Event Log          #   #        Queue          #    # Out                                   #
 * #-----------------#   #--------------------#   #-----------------------#    #---------------------------------------#
 * #                 #   #                    #   #                       #    # watch file                            #
 * #                 #   #                    #   #                       #    #File ${filename} is no longer watched  #
 * #                 #   #                    #   #                       #    # file has been modified                #
 * #                 #   #                    #   #                       #    # file has been modified second time    #        
 * ###################   ######################   #########################    #########################################
 *
 * 
 */
