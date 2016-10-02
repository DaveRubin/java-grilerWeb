package gridlerServer.servlets;

import gridlerServer.logic.UserManager;
import gridlerServer.models.GameLobbyItem;
import gridlerServer.models.MainLobbyResponse;
import gridlerServer.models.PlayerDefinition;
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
            throws ServletException, IOException {

        //returning JSON objects, not HTML
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            MainLobbyResponse mlRespons = new MainLobbyResponse();
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            mlRespons.users = userManager.getUsers();

            //TODO - add actual games to list
            int games = 5;

            for (int i = 0; i < games; i++) {
                ArrayList<PlayerDefinition> players = new ArrayList<>();

                for (int j = 0; j < i+1; j++) {
                    players.add(new PlayerDefinition("Player " + Integer.toString(j),"human"));
                }
                mlRespons.games.add(new GameLobbyItem("room " +Integer.toString(i) ,i+2,players,players.get(0).name ,new Point(i+3,i+3)));
            }

            String json = gson.toJson(mlRespons);
            out.println(json);
            out.flush();
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
