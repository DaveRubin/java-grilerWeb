package gridlerServer.servlets;

import gridlerServer.Constants;
import gridlerServer.logic.UserManager;
import gridlerServer.models.ConnectionResponse;
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
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 *
 * @author blecherl
 */
@WebServlet(name = "LogOutServlet", urlPatterns = {"/logOut"})
public class LogOutServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        SimpleResponse result = new SimpleResponse();
        response.setContentType("application/json");

        User userFromSession = SessionUtils.getCurrentSessionUser(request);

        if (userFromSession == null) {
            result.message = "No logged user to logout";
        }
        else {
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            userManager.removeUser(userFromSession);
            SessionUtils.removeUserFromSession(request);
        }


        ResponseUtils.writeOutJsonObject(response,result);
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
