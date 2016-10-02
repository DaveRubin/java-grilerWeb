package gridlerServer.servlets;

import gridlerServer.Constants;
import gridlerServer.logic.UserManager;
import gridlerServer.models.ConnectionResponse;
import gridlerServer.models.User;
import gridlerServer.utils.ServletUtils;
import gridlerServer.utils.SessionUtils;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *
 * @author blecherl
 */
@WebServlet(name = "LoginServlet", urlPatterns = {"/login"})
public class LoginServlet extends HttpServlet {

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

        ConnectionResponse connectionResponse = new ConnectionResponse();
        response.setContentType("application/json");
        //String usernameFromSession = SessionUtils.getUsername(request);
        User userFromSession = SessionUtils.getUserFromSession(request);
        UserManager userManager = ServletUtils.getUserManager(getServletContext());

        if (userFromSession == null) {
            //user is not logged in yet
            User userFromParameters = SessionUtils.getUserFromRequest(request);
            //String usernameFromParameter = request.getParameter(USER_NAME);
            if (userFromParameters== null) {
                //no username in session and no username in parameter -
                //redirect back to the index page
                //this return an HTTP code back to the browser telling it to load
                //the given URL (in this case: "index.jsp")
                connectionResponse.text = "invalid parameters";
                connectionResponse.error = true;
            } else {
                if (userManager.isUserExists(userFromParameters)) {
                    String errorMessage = "Username " + userFromParameters.name+ " already exists. Please enter a different username.";
                    connectionResponse.text = errorMessage;
                    connectionResponse.error = true;
                    //username already exists, forward the request back to index.jsp
                    //with a parameter that indicates that an error should be displayed

//                    request.setAttribute(Constants.USER_NAME_ERROR, errorMessage);
//                    getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
                } else {
                    //add the new user to the users list
                    userManager.addUser(userFromParameters);
                    //set the username in a session so it will be available on each request
                    //the true parameter means that is a session object does not exists yet
                    //create a new one
                    request.getSession(true).setAttribute(Constants.USER_NAME, userFromParameters);

                    connectionResponse.text = userFromParameters.name + " Logged in again";
                    connectionResponse.user = userFromParameters;
                }
            }
        } else {
            //user is already logged in
            //response.sendRedirect("chatroom.html");
            connectionResponse.text = userFromSession.name + " Logged in again";
            connectionResponse.user = userFromSession;
        }

        if (connectionResponse.error) {
            //response.set
        }
        else {
            System.out.println(connectionResponse.text);
        }

        try (PrintWriter out = response.getWriter()) {
            Gson gson = new Gson();
            String jsonResponse = gson.toJson(connectionResponse);
            out.print(jsonResponse);
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
