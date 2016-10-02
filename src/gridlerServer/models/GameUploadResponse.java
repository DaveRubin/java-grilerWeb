package gridlerServer.models;

/**
 * Created by david on 02/10/2016.
 */
public class GameUploadResponse {
    public boolean error;
    public String message;

    public GameUploadResponse(String message, boolean error) {
        this.message = message;
        this.error = error;
    }
}
