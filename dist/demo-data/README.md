# Demo Data Directory

This directory contains sample documents and data for the Subrogation AI Platform demo.

## Structure

### `/pdfs/`
Place your demo PDF files here. These should include:
- Provider notes with liability indicators
- Claim forms with accident descriptions
- Member correspondence
- Policy excerpts
- Incident reports

### Suggested PDF File Names:
- `auto_accident_provider_note.pdf` - Medical records from auto accident
- `workplace_injury_claim.pdf` - Workers compensation claim
- `third_party_liability_report.pdf` - Incident report showing third-party fault
- `coordination_benefits_letter.pdf` - Member letter indicating dual coverage
- `clear_liability_case.pdf` - Obvious subrogation opportunity
- `no_liability_case.pdf` - Case with no subrogation potential

## Integration

Once PDFs are added here, they can be:
1. Referenced in mock claim data (`src/components/Dashboard.tsx`)
2. Used in the document viewer components
3. Processed by the simulated OCR agent in the workflow
4. Highlighted for liability detection demonstrations

## File Access

Files in the `public/` directory are accessible at:
```
http://localhost:5177/demo-data/pdfs/your-file.pdf
```

This allows the demo to show actual document viewing and processing workflows.