package gridlerServer.servlets;

import com.google.gson.Gson;
import core.controllers.Game;
import core.controllers.player.ComputerPlayer;
import core.controllers.player.HumanPlayer;
import core.controllers.player.Player;
import gridlerServer.Constants;
import gridlerServer.logic.GameManager;
import gridlerServer.logic.UserManager;
import gridlerServer.models.MainLobbyResponse;
import gridlerServer.models.SimpleResponse;
import gridlerServer.models.User;
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

/**
 * Should get a RoomDescription object in "room"
 */
@WebServlet(name = "JoinRoomServlet", urlPatterns = {"/joinRoom"})
public class JoinRoomServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        SimpleResponse r = new SimpleResponse();
        boolean isError = false;
        String message = "";

        //returning JSON objects, not HTML
        response.setContentType("application/json");

        String roomName = request.getParameter(Constants.ROOM_NAME);
        String roomCreatedBy = request.getParameter(Constants.ROOM_CREATED_BY);

        if (roomName == null || roomCreatedBy == null) {
            isError = true;
            message =  "missing one or more of the parameters ('roomName'/'roomCreatedBy')";
        }
        else {
            //first find room
            GameManager gamesManager = ServletUtils.getGamesManager(getServletContext());
            Game game = gamesManager.getGame(roomName,roomCreatedBy);

            if (game == null) {
                isError = true;
                message = "Room "+ roomName+ " wan't found";
            }
            else {
                //if room found check if user can enter the room
                User userFromSession = SessionUtils.getCurrentSessionUser(request);
                if (userFromSession == null) {
                    isError = true;
                    message = "You must be logged in in order to join a room";
                }
                else {
                    if (userIsInGame(userFromSession,game)) {
                        isError = true;
                        message = "You are trying to enter twice to the same game";
                    }
                    else {
                        game.registerPlayer(createAPlayerForUser(userFromSession));
                        message = "User " + userFromSession.name + " has entered the game " + roomName +" successfully";
                    }
                }
            }


        }

        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            r.error = isError;
            r.message = message;
            String jsonResponse = gson.toJson(r);
            out.print(jsonResponse);
            out.flush();
        }
    }

    private Player createAPlayerForUser(User userFromSession) {
        if (Objects.equals(userFromSession.type, Constants.HUMAN_TYPE)) {
            return new HumanPlayer(userFromSession.name);
        }
        else {
            return new ComputerPlayer(userFromSession.name);
        }
    }

    /**
     * Check if a given user is playing a given game
     * @param userFromSession
     * @param game
     * @return
     */
    private boolean userIsInGame(User userFromSession, Game game) {
        boolean inGame = false;
        for (Player player : game.getPlayers()) {
            if (Objects.equals(player.name, userFromSession.name)) {
                inGame = true;
                break;
            }
        }
        return inGame;
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
