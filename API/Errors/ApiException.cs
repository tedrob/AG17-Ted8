using System.Diagnostics;

namespace API.Errors;

[DebuggerDisplay($"{{{nameof(GetDebuggerDisplay)}(),nq}}")]
public class ApiException
{
    public ApiException(int statusCode, string message, string details) 
    {
        StatusCode = statusCode;
        Message = message;
        Details = details;
    }
        
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }

    private string GetDebuggerDisplay()
    {
        return ToString();
    }
}