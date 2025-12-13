namespace Nafeza.Domain.Enums
{
    public enum PartyType
    {
        Importer = 1,       // Egyptian Company (Must have Tax ID)
        ForeignExporter = 2,// International Company (Must have CargoX ID)
        CustomsBroker = 3   // Service Provider (Clearance Agent)
    }
}