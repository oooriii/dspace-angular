import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Item } from '../../../../../../../../app/core/shared/item.model';

export interface CitationFormat {
  value: string;
  label: string;
}

@Component({
  selector: 'ds-citation-export',
  templateUrl: './citation-export.component.html',
  styleUrls: ['./citation-export.component.scss']
})
export class CitationExportComponent implements OnInit {

  @Input() item: Item;

  constructor(private clipboard: Clipboard) {}

  selectedFormat = 'apa';
  isExpanded = false;

  citationFormats: CitationFormat[] = [
    { value: 'apa', label: 'APA' },
    { value: 'mla', label: 'MLA' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'turabian', label: 'Turabian' },
    { value: 'ieee', label: 'IEEE' },
    { value: 'bibtex', label: 'BibTeX' },
    { value: 'ris', label: 'RIS' }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  onFormatChange(format: string): void {
    this.selectedFormat = format;
  }

  downloadCitation(): void {
    const citation = this.generateCitation(this.selectedFormat);
    const filename = this.getFilename(this.selectedFormat);

    this.downloadFile(citation, filename);
  }

  getCitationPreview(): string {
    return this.generateCitation(this.selectedFormat);
  }

  copyToClipboard(): void {
    const citation = this.generateCitation(this.selectedFormat);
    const successful = this.clipboard.copy(citation);
    
    if (successful) {
      // TODO: Add success notification
      console.log('Citation copied to clipboard');
    } else {
      // TODO: Add error notification
      console.error('Failed to copy citation to clipboard');
    }
  }

  private generateCitation(format: string): string {
    switch (format) {
      case 'apa':
        return this.generateAPA();
      case 'mla':
        return this.generateMLA();
      case 'chicago':
        return this.generateChicago();
      case 'turabian':
        return this.generateTurabian();
      case 'ieee':
        return this.generateIEEE();
      case 'bibtex':
        return this.generateBibTeX();
      case 'ris':
        return this.generateRIS();
      default:
        return this.generateAPA();
    }
  }

  private generateAPA(): string {
    const authors = this.item.allMetadataValues('dc.contributor.author');
    const title = this.item.firstMetadataValue('dc.title');
    const date = this.item.firstMetadataValue('dc.date.issued');
    const publisher = this.item.firstMetadataValue('dc.publisher');
    const doi = this.item.firstMetadataValue('dc.identifier.doi');
    const uri = this.item.firstMetadataValue('dc.identifier.uri');

    let citation = '';

    if (authors.length > 0) {
      citation += this.formatAuthorsAPA(authors) + ' ';
    }

    if (date) {
      citation += `(${new Date(date).getFullYear()}). `;
    }

    if (title) {
      citation += `${title}. `;
    }

    if (publisher) {
      citation += `${publisher}. `;
    }

    if (doi) {
      citation += `https://doi.org/${doi}`;
    } else if (uri) {
      citation += uri;
    }

    return citation;
  }

  private generateMLA(): string {
    const authors = this.item.allMetadataValues('dc.contributor.author');
    const title = this.item.firstMetadataValue('dc.title');
    const date = this.item.firstMetadataValue('dc.date.issued');
    const publisher = this.item.firstMetadataValue('dc.publisher');
    const uri = this.item.firstMetadataValue('dc.identifier.uri');

    let citation = '';

    if (authors.length > 0) {
      citation += this.formatAuthorsMLA(authors) + ' ';
    }

    if (title) {
      citation += `"${title}." `;
    }

    if (publisher) {
      citation += `${publisher}, `;
    }

    if (date) {
      citation += `${new Date(date).getFullYear()}. `;
    }

    if (uri) {
      citation += `Web. ${uri}`;
    }

    return citation;
  }

  private generateChicago(): string {
    const authors = this.item.allMetadataValues('dc.contributor.author');
    const title = this.item.firstMetadataValue('dc.title');
    const date = this.item.firstMetadataValue('dc.date.issued');
    const publisher = this.item.firstMetadataValue('dc.publisher');
    const uri = this.item.firstMetadataValue('dc.identifier.uri');

    let citation = '';

    if (authors.length > 0) {
      citation += this.formatAuthorsChicago(authors) + ' ';
    }

    if (title) {
      citation += `"${title}." `;
    }

    if (publisher) {
      citation += `${publisher}, `;
    }

    if (date) {
      citation += `${new Date(date).getFullYear()}. `;
    }

    if (uri) {
      citation += uri;
    }

    return citation;
  }

  private generateTurabian(): string {
    // Turabian is similar to Chicago
    return this.generateChicago();
  }

  private generateIEEE(): string {
    const authors = this.item.allMetadataValues('dc.contributor.author');
    const title = this.item.firstMetadataValue('dc.title');
    const date = this.item.firstMetadataValue('dc.date.issued');
    const publisher = this.item.firstMetadataValue('dc.publisher');
    const doi = this.item.firstMetadataValue('dc.identifier.doi');
    const uri = this.item.firstMetadataValue('dc.identifier.uri');

    let citation = '';

    if (authors.length > 0) {
      citation += this.formatAuthorsIEEE(authors) + ', ';
    }

    if (title) {
      citation += `"${title}," `;
    }

    if (publisher) {
      citation += `${publisher}, `;
    }

    if (date) {
      citation += `${new Date(date).getFullYear()}. `;
    }

    if (doi) {
      citation += `doi: ${doi}`;
    } else if (uri) {
      citation += `[Online]. Available: ${uri}`;
    }

    return citation;
  }

  private generateBibTeX(): string {
    const authors = this.item.allMetadataValues('dc.contributor.author');
    const title = this.item.firstMetadataValue('dc.title');
    const date = this.item.firstMetadataValue('dc.date.issued');
    const publisher = this.item.firstMetadataValue('dc.publisher');
    const doi = this.item.firstMetadataValue('dc.identifier.doi');
    const uri = this.item.firstMetadataValue('dc.identifier.uri');

    let citation = '@article{';

    // Generate a citation key
    const firstAuthor = authors.length > 0 ? authors[0].split(',')[0].replace(/\s+/g, '').toLowerCase() : 'unknown';
    const year = date ? new Date(date).getFullYear() : 'unknown';
    citation += `${firstAuthor}${year},\n`;

    if (title) {
      citation += `  title={${title}},\n`;
    }

    if (authors.length > 0) {
      citation += `  author={${authors.join(' and ')}},\n`;
    }

    if (date) {
      citation += `  year={${new Date(date).getFullYear()}},\n`;
    }

    if (publisher) {
      citation += `  publisher={${publisher}},\n`;
    }

    if (doi) {
      citation += `  doi={${doi}},\n`;
    } else if (uri) {
      citation += `  url={${uri}},\n`;
    }

    citation += '}';

    return citation;
  }

  private generateRIS(): string {
    const authors = this.item.allMetadataValues('dc.contributor.author');
    const title = this.item.firstMetadataValue('dc.title');
    const date = this.item.firstMetadataValue('dc.date.issued');
    const publisher = this.item.firstMetadataValue('dc.publisher');
    const doi = this.item.firstMetadataValue('dc.identifier.doi');
    const uri = this.item.firstMetadataValue('dc.identifier.uri');

    let citation = 'TY  - GEN\n';

    if (title) {
      citation += `TI  - ${title}\n`;
    }

    authors.forEach(author => {
      citation += `AU  - ${author}\n`;
    });

    if (date) {
      citation += `PY  - ${new Date(date).getFullYear()}\n`;
    }

    if (publisher) {
      citation += `PB  - ${publisher}\n`;
    }

    if (doi) {
      citation += `DO  - ${doi}\n`;
    }

    if (uri) {
      citation += `UR  - ${uri}\n`;
    }

    citation += 'ER  - \n';

    return citation;
  }

  private formatAuthorsAPA(authors: string[]): string {
    if (authors.length === 1) {
      return this.formatSingleAuthorAPA(authors[0]);
    } else if (authors.length === 2) {
      return `${this.formatSingleAuthorAPA(authors[0])}, & ${this.formatSingleAuthorAPA(authors[1])}`;
    } else if (authors.length > 2) {
      const formattedAuthors = authors.slice(0, -1).map(author => this.formatSingleAuthorAPA(author));
      return `${formattedAuthors.join(', ')}, & ${this.formatSingleAuthorAPA(authors[authors.length - 1])}`;
    }
    return '';
  }

  private formatAuthorsMLA(authors: string[]): string {
    if (authors.length === 1) {
      return this.formatSingleAuthorMLA(authors[0]);
    } else if (authors.length === 2) {
      return `${this.formatSingleAuthorMLA(authors[0])}, and ${this.formatSingleAuthorMLA(authors[1])}`;
    } else if (authors.length > 2) {
      return `${this.formatSingleAuthorMLA(authors[0])}, et al.`;
    }
    return '';
  }

  private formatAuthorsChicago(authors: string[]): string {
    if (authors.length === 1) {
      return this.formatSingleAuthorChicago(authors[0]);
    } else if (authors.length === 2) {
      return `${this.formatSingleAuthorChicago(authors[0])}, and ${this.formatSingleAuthorChicago(authors[1])}`;
    } else if (authors.length > 2) {
      return `${this.formatSingleAuthorChicago(authors[0])}, et al.`;
    }
    return '';
  }

  private formatAuthorsIEEE(authors: string[]): string {
    if (authors.length === 1) {
      return this.formatSingleAuthorIEEE(authors[0]);
    } else if (authors.length <= 3) {
      const formattedAuthors = authors.map(author => this.formatSingleAuthorIEEE(author));
      return formattedAuthors.join(', ');
    } else {
      return `${this.formatSingleAuthorIEEE(authors[0])}, et al.`;
    }
  }

  private formatSingleAuthorAPA(author: string): string {
    const parts = author.split(',');
    if (parts.length >= 2) {
      const lastName = parts[0].trim();
      const firstName = parts[1].trim();
      return `${lastName}, ${firstName.charAt(0)}.`;
    }
    return author;
  }

  private formatSingleAuthorMLA(author: string): string {
    const parts = author.split(',');
    if (parts.length >= 2) {
      const lastName = parts[0].trim();
      const firstName = parts[1].trim();
      return `${lastName}, ${firstName}`;
    }
    return author;
  }

  private formatSingleAuthorChicago(author: string): string {
    const parts = author.split(',');
    if (parts.length >= 2) {
      const lastName = parts[0].trim();
      const firstName = parts[1].trim();
      return `${lastName}, ${firstName}`;
    }
    return author;
  }

  private formatSingleAuthorIEEE(author: string): string {
    const parts = author.split(',');
    if (parts.length >= 2) {
      const lastName = parts[0].trim();
      const firstName = parts[1].trim();
      return `${firstName.charAt(0)}. ${lastName}`;
    }
    return author;
  }

  private getFilename(format: string): string {
    const title = this.item.firstMetadataValue('dc.title') || 'citation';
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 50);

    const extensions = {
      'apa': 'txt',
      'mla': 'txt',
      'chicago': 'txt',
      'turabian': 'txt',
      'ieee': 'txt',
      'bibtex': 'bib',
      'ris': 'ris'
    };

    return `${sanitizedTitle}_${format}.${extensions[format] || 'txt'}`;
  }

  private downloadFile(content: string, filename: string): void {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
