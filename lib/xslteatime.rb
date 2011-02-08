require 'nokogiri'

class Xslteatime
  
  attr_accessor :doc, :xslt, :errors
  
  def initialize(infile, xslt)
    self.doc = Nokogiri::XML(infile)
    self.xslt = xslt          
    self.errors = []
  end
  
  def convert
    self.errors = []
    result = nil
    begin
      xsl = Nokogiri::XSLT(self.xslt)
      result = xsl.apply_to(self.doc).to_s
    rescue RuntimeError => e
      self.errors << e.message
    end
    
  end
  
end
