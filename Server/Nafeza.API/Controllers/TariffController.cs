using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nafeza.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Nafeza.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TariffController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TariffController(AppDbContext context)
        {
            _context = context;
        }

        // 1. Get Dropdown List (LOWERCASE KEYS)
        [HttpGet("chapters")]
        public async Task<IActionResult> GetChapters()
        {
            var list = new List<object>();
            var connection = _context.Database.GetDbConnection();

            try
            {
                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    command.CommandText = "SELECT Id, Code, Name FROM TariffChapters";
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            // CRITICAL FIX: keys must be lowercase (id, code, name)
                            list.Add(new
                            {
                                id = reader.GetInt32(0),
                                code = reader.GetString(1),
                                name = reader.GetString(2)
                            });
                        }
                    }
                }
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }

            return Ok(list);
        }

        // 2. Search Engine
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string type, [FromQuery] string query, [FromQuery] int? chapterId)
        {
            var results = new List<object>();
            var connection = _context.Database.GetDbConnection();

            try
            {
                if (connection.State != ConnectionState.Open)
                    await connection.OpenAsync();

                using (var command = connection.CreateCommand())
                {
                    var sql = "SELECT HSCode, Description, DutyRate FROM TariffItems WHERE 1=1";

                    if (type == "code")
                    {
                        if (!string.IsNullOrEmpty(query))
                            sql += $" AND HSCode LIKE '{query}%'";
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(query))
                            sql += $" AND Description LIKE '%{query}%'";

                        // FIX: Ensure chapterId is valid
                        if (chapterId.HasValue && chapterId > 0)
                            sql += $" AND ChapterId = {chapterId}";
                    }

                    command.CommandText = sql;

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            results.Add(new
                            {
                                hsCode = reader.GetValue(0).ToString(),
                                description = reader.GetValue(1).ToString(),
                                dutyRate = reader.GetValue(2)
                            });
                        }
                    }
                }
            }
            finally
            {
                if (connection.State == ConnectionState.Open)
                    connection.Close();
            }

            return Ok(results);
        }
    }
}