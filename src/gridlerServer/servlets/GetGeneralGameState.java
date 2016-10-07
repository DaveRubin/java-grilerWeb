package gridlerServer.servlets;

import core.controllers.Game;
import core.model.GameSettings;
import gridlerServer.Constants;
import gridlerServer.logic.GameManager;
import gridlerServer.models.GeneralGameState;
import gridlerServer.utils.ResponseUtils;
import gridlerServer.utils.ServletUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Should get a RoomDescription object in "room"
 */
@WebServlet(name = "GetGeneralGameState", urlPatterns = {"/getGeneralGameState"})
public class GetGeneralGameState extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        GameManager gameManager = ServletUtils.getGamesManager(getServletContext());
        GeneralGameState ggs = new GeneralGameState();

        String roomName = request.getParameter(Constants.ROOM_NAME);
        String roomCreatedBy = request.getParameter(Constants.ROOM_CREATED_BY);

        if (roomName != null && roomCreatedBy != null) {
            Game game = gameManager.getGame(roomName,roomCreatedBy);
            ggs = GeneralGameState.createFromGame(game);
        }

        ResponseUtils.writeOutJsonObject(response,ggs);
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
