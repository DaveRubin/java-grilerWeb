package gridlerServer.servlets;

import com.google.gson.Gson;
import core.controllers.Game;
import core.controllers.player.ComputerPlayer;
import core.controllers.player.HumanPlayer;
import core.controllers.player.Player;
import core.model.GameSettings;
import gridlerServer.Constants;
import gridlerServer.logic.GameManager;
import gridlerServer.models.SimpleResponse;
import gridlerServer.models.User;
import gridlerServer.utils.ResponseUtils;
import gridlerServer.utils.ServletUtils;
import gridlerServer.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

@WebServlet(name = "LeaveGameServlet", urlPatterns = {"/leaveGame"})
public class LeaveGameServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        SimpleResponse r = new SimpleResponse();
        boolean isError = false;
        String message = "";

        String roomID = request.getParameter(Constants.ROOM_NAME);

        if (roomID == null ) {
            isError = true;
            message =  "missing one or more of the parameters ('roomName'/'roomCreatedBy')";
        }
        else {
            //first find room
            GameManager gamesManager = ServletUtils.getGamesManager(getServletContext());
            Game game = gamesManager.getGame(roomID);

            if (game == null) {
                isError = true;
                message = "Room #"+ roomID+ " wan't found";
            }
            else {
                //if room found check if user can enter the room
                User userFromSession = SessionUtils.getCurrentSessionUser(request);
                if (userFromSession == null) {
                    isError = true;
                    message = "You must be logged in in order to join a room";
                }
                else {
                    boolean success = game.unregisterPlayer(createAPlayerForUser(userFromSession));
                    if (success) {
                        message = "User " + userFromSession.name + " has entered the game " + roomID +" successfully";
                    }
                    else {
                        isError = true;
                        message = "User " + userFromSession.name + " wan't found in game " + roomID;
                    }
                }
            }
        }

        r.error = isError;
        r.message = message;
        ResponseUtils.writeOutJsonObject(response,r);
    }


    private Player createAPlayerForUser(User userFromSession) {
        if (Objects.equals(userFromSession.type, Constants.HUMAN_TYPE)) {
            return new HumanPlayer(userFromSession.name);
        }
        else {
            return new ComputerPlayer(userFromSession.name);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
