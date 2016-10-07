package gridlerServer.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import core.controllers.Game;
import core.controllers.player.Player;
import core.model.GameSettings;
import core.model.GridCell;
import core.model.enums.CellColor;
import gridlerServer.Constants;
import gridlerServer.logic.GameManager;
import gridlerServer.utils.ResponseUtils;
import gridlerServer.utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

/**
 * Should get a RoomDescription object in "room"
 */
@WebServlet(name = "SubmitMoveServlet", urlPatterns = {"/submitMove"})
public class SubmitMoveServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        GameManager gameManager = ServletUtils.getGamesManager(getServletContext());

        String roomName =  request.getParameter(Constants.ROOM_NAME);
        String roomCreatedBy = request.getParameter(Constants.ROOM_CREATED_BY);
        Object actionObject = request.getParameter("playerMove");
        Gson g = new Gson();
        PlayerAction playerAction =   g.fromJson((String) actionObject,PlayerAction.class);

        Response responseObject = new Response();

        if (roomName != null && roomCreatedBy != null) {

            Game game = gameManager.getGame(roomName,roomCreatedBy);

            CellColor selectedColor = CellColor.Undefined;
            if (Objects.equals(playerAction.color, "black")) selectedColor = CellColor.Black;
            if (Objects.equals(playerAction.color, "white")) selectedColor = CellColor.White;

            Player currentPlayer = game.currentPlayer();
            currentPlayer.selectionColor = selectedColor;
            currentPlayer.setSelection(playerAction.positions);

            currentPlayer.play();

            responseObject.cells = currentPlayer.getGrid().cells;
        }

        ResponseUtils.writeOutJsonObject(response,responseObject);
    }

    private class Response {
        GridCell[][] cells;
    }

    private class PlayerAction {
        public String color;
        public ArrayList<Point> positions;
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
