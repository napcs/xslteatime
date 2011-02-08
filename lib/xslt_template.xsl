<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- HTML output -->
  <xsl:output method="html"/>
  

  <xsl:template match="root">
    <h1>People of Springfield</h1>
    <!-- Don't stop! Try applying other templates -->
    <xsl:apply-templates/>

    <h5>This template is just an example. Make your own!</h5>
  </xsl:template>

  <!-- Find the "people" node and build a header -->
  <xsl:template match="people">
    <h2>People</h2> 
    <ul>
      <!-- Don't stop! Try applying other templates -->
      <xsl:apply-templates/>
    </ul>
  
  </xsl:template>

  <!-- Find all of the "person" nodes -->
  <xsl:template match="person">
    <li>
      <!-- Display the first name -->
      <xsl:value-of select="first_name" />
      <!-- Insert a space -->
      <xsl:text> </xsl:text>
      <!-- Display the last name -->
      <xsl:value-of select="last_name" />
    </li>
  </xsl:template>  

  
</xsl:stylesheet>
