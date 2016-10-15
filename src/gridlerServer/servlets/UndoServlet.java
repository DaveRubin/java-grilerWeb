package gridlerServer.servlets;

import com.google.gson.Gson;
import core.controllers.Game;
import core.controllers.player.Player;
import core.model.GridCell;
import core.model.enums.CellColor;
import gridlerServer.Constants;
import gridlerServer.logic.GameManager;
import gridlerServer.models.SimpleResponse;
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
 * Play "Undo" move for current player
 */
@WebServlet(name = "UndoServlet", urlPatterns = {"/undo"})
public class UndoServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        GameManager gameManager = ServletUtils.getGamesManager(getServletContext());

        String roomID =  request.getParameter(Constants.ROOM_NAME);

        Response responseObject = new Response();

        if (roomID != null ) {

            Game game = gameManager.getGame(roomID);
            if (game == null) {
                responseObject.error = true;
                responseObject.message = "room " + roomID+ " wan't found.";
            }
            else {
                Player currentPlayer = game.currentPlayer();
                currentPlayer.undo();

                responseObject.error = false;
                responseObject.message = "Undo played";
                responseObject.cells = currentPlayer.getGrid().cells;
                responseObject.history = currentPlayer.GetMovesHistory();
                responseObject.undoAvailable = currentPlayer.isUndoAvailable();
                responseObject.redoAvailable = currentPlayer.isRedoAvailable();
            }
        }
        else {
            responseObject.error = true;
            responseObject.message = "Invalid ROOMID parameter sent";
        }

        ResponseUtils.writeOutJsonObject(response,responseObject);
    }
    private class Response {
        boolean error;
        String message;
        GridCell[][] cells;
        ArrayList<ArrayList<core.model.PlayerAction>> history;
        boolean undoAvailable;
        boolean redoAvailable;
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
