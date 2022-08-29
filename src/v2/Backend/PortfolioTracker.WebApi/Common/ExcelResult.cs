
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;

namespace PortfolioTracker.WebApi.Common;

public class ExcelResult : FileResult
{
    private const string CONTENT_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    private readonly XLWorkbook workbook;
    private readonly string fileName;

    public ExcelResult(XLWorkbook workbook, string fileName)
        : base(CONTENT_TYPE)
    {
        this.workbook = workbook;
        this.fileName = fileName;
    }

    public override async Task ExecuteResultAsync(ActionContext context)
    {
        var response = context.HttpContext.Response;
        response.Headers.Add("Content-Disposition", new[] { "attachment; filename=" + fileName });
        response.ContentType = CONTENT_TYPE;

        var memoryStream = new MemoryStream();
        workbook.SaveAs(memoryStream);

        memoryStream.Seek(0, SeekOrigin.Begin);

        await memoryStream.CopyToAsync(response.Body);
    }
}
