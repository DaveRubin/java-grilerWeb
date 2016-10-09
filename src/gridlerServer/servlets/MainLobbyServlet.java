package gridlerServer.servlets;

import gridlerServer.logic.GameManager;
import gridlerServer.logic.UserManager;
import gridlerServer.models.GameLobbyItem;
import gridlerServer.models.MainLobbyResponse;
import gridlerServer.models.PlayerDefinition;
import gridlerServer.utils.ResponseUtils;
import gridlerServer.utils.ServletUtils;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

@WebServlet(name = "MainLobbyServlet", urlPatterns = {"/getLobbyData"})
public class MainLobbyServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, InterruptedException {

        //returning JSON objects, not HTML
        response.setContentType("application/json");
        MainLobbyResponse mlRespons = new MainLobbyResponse();
        //get users
        UserManager userManager = ServletUtils.getUserManager(getServletContext());
        mlRespons.users = userManager.getUsers();

        //get games
        GameManager gameManager = ServletUtils.getGamesManager(getServletContext());
        mlRespons.games = gameManager.getGameItemRooms();

        ResponseUtils.writeOutJsonObject(response,mlRespons);
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
        try {
            processRequest(request, response);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
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
        try {
            processRequest(request, response);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
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
