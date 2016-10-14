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

/**
 * Should get a RoomDescription object in "room"
 */
@WebServlet(name = "GetGameSettingsServlet", urlPatterns = {"/getGameSettings"})
public class GetGameSettingsServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        GameManager gameManager = ServletUtils.getGamesManager(getServletContext());

        String roomId = request.getParameter(Constants.ROOM_NAME);
        GameSettings settings = new GameSettings();

        if (roomId != null) {
            Game game = gameManager.getGame(roomId);
            settings = game.getSettings();
        }

        ResponseUtils.writeOutJsonObject(response,settings);
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
